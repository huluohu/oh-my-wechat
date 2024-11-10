import { DatabaseName } from "@/lib/schema.ts";
import { createContext, useContext, useEffect, useState } from "react";
import initSqlJs, { type Database, type QueryExecResult } from "sql.js";
import sqliteUrl from "../../../node_modules/sql.js/dist/sql-wasm.wasm?url";

const DatabaseContext = createContext<{
  initialized: boolean;
  loadDirectory: (directoryHandle: FileSystemDirectoryHandle) => Promise<void>;
  dictionary: FileSystemDirectoryHandle;
  databases: { [key in DatabaseName]: Database | Database[] };
}>({
  initialized: false,
  loadDirectory: () => Promise.resolve(),
  dictionary: undefined,
  databases: {},
});

export const DatabaseProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<FileSystemDirectoryHandle>();
  const [databases, setDatabases] = useState<{
    [key: string]: Database | Database[];
  }>({});

  const databaseTemp: {
    [key: string]: Database | Database[];
  } = {};

  const loadDirectory = async (directoryHandle: FileSystemDirectoryHandle) => {
    setDictionary(directoryHandle);

    const SQL = await initSqlJs({ locateFile: () => sqliteUrl });

    const manifestDatabaseHandle =
      await directoryHandle.getFileHandle("Manifest.db");
    const manifestDatabaseFileBuffer = await (
      await manifestDatabaseHandle.getFile()
    ).arrayBuffer();

    const manifestDatabase = new SQL.Database(
      new Uint8Array(manifestDatabaseFileBuffer),
    );

    databaseTemp[DatabaseName.manifest] = manifestDatabase;

    let rows: QueryExecResult[];

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "%/session/session.db" AND "flags" = 1`,
    );

    console.log(rows);

    if (rows.length > 0) {
      const fileID = rows[0].values[0][0];
      const filePrefix = fileID.substring(0, 2);
      const filePath = `${filePrefix}/${fileID}`;

      console.log("session.db", filePath);

      const subDirectoryHandle =
        await directoryHandle.getDirectoryHandle(filePrefix);

      const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
      const databaseFileBuffer = await (
        await databaseHandle.getFile()
      ).arrayBuffer();
      databaseTemp[DatabaseName.session] = new SQL.Database(
        new Uint8Array(databaseFileBuffer),
      );
    }

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "%WCDB_Contact.sqlite" AND "flags" = 1`,
    );
    if (rows.length > 0) {
      const fileID = rows[0].values[0][0];
      const filePrefix = fileID.substring(0, 2);
      const filePath = `${filePrefix}/${fileID}`;

      const subDirectoryHandle =
        await directoryHandle.getDirectoryHandle(filePrefix);

      const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
      const databaseFileBuffer = await (
        await databaseHandle.getFile()
      ).arrayBuffer();
      databaseTemp[DatabaseName.WCDB_Contact] = new SQL.Database(
        new Uint8Array(databaseFileBuffer),
      );
    }

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "%message_%.sqlite" AND "flags" = 1 ORDER BY "relativePath" ASC`,
    );

    if (rows.length > 0) {
      for (const row of rows[0].values) {
        const fileID = row[0];
        const filePrefix = fileID.substring(0, 2);
        const filePath = `${filePrefix}/${fileID}`;

        const subDirectoryHandle =
          await directoryHandle.getDirectoryHandle(filePrefix);

        const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
        const databaseFileBuffer = await (
          await databaseHandle.getFile()
        ).arrayBuffer();
        databaseTemp[DatabaseName.message] ||
          (databaseTemp[DatabaseName.message] = []);
        databaseTemp[DatabaseName.message].push(
          new SQL.Database(new Uint8Array(databaseFileBuffer)),
        );
      }
    }

    setDatabases(databaseTemp);
    setInitialized(true);
  };

  useEffect(() => {
    return () => {
      for (const databaseName in databases) {
        if (Array.isArray(databaseTemp[databaseName])) {
          for (const db of databaseTemp[databaseName]) {
            db.close();
          }
        } else {
          databaseTemp[databaseName].close();
        }
      }
    };
  }, []);

  return (
    <DatabaseContext.Provider
      value={{ initialized, loadDirectory, dictionary, databases }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
