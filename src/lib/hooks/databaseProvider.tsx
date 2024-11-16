import type { Account, WCDatabaseNames, WCDatabases } from "@/lib/schema.ts";
import { createContext, useContext, useEffect, useState } from "react";
import initSqlJs, { type Database, type QueryExecResult } from "sql.js";
import sqliteUrl from "../../../node_modules/sql.js/dist/sql-wasm.wasm?url";

const DatabaseContext = createContext<{
  loadDirectory: (directoryHandle: FileSystemDirectoryHandle) => Promise<void>;
  directory: FileSystemDirectoryHandle | undefined;
  accountList: Account[];
  loadDatabases: (account: Account) => Promise<void>;
  account: Account | undefined;
  databases: WCDatabases;
}>({
  loadDirectory: () => Promise.resolve(),
  directory: undefined,
  accountList: [],
  loadDatabases: () => Promise.resolve(),
  account: undefined,
  databases: {},
});

export const DatabaseProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [directory, setDirectory] = useState<FileSystemDirectoryHandle>();
  const [databases, setDatabases] = useState<WCDatabases>({});

  const [accountList, setAccountList] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account>();

  const databaseTemp: WCDatabases = {};

  const loadDirectory = async (directoryHandle: FileSystemDirectoryHandle) => {
    setDirectory(directoryHandle);

    const SQL = await initSqlJs({ locateFile: () => sqliteUrl });

    const manifestDatabaseHandle =
      await directoryHandle.getFileHandle("Manifest.db");
    const manifestDatabaseFileBuffer = await (
      await manifestDatabaseHandle.getFile()
    ).arrayBuffer();

    const manifestDatabase = new SQL.Database(
      new Uint8Array(manifestDatabaseFileBuffer),
    );

    databaseTemp.manifest = manifestDatabase;

    let rows: QueryExecResult[];

    // TODO 列出微信所有账号，需要过滤查询结果
    rows = manifestDatabase.exec(
      "SELECT * FROM Files WHERE domain = 'AppDomain-com.tencent.xin' AND relativePath LIKE 'Documents/________________________________' AND flags = 2;",
    );

    console.log(rows);

    if (rows.length > 0) {
      const accounts: Account[] = [];

      for (const row of rows[0].values) {
        if ((row[2] as string) === "Documents/00000000000000000000000000000000")
          continue;
        if (/^Documents\/[a-f0-9]{32}$/.test(row[2] as string)) {
          accounts.push({
            md5: (row[2] as string).split("/").pop() as string,
          });
        }
      }

      setAccountList(accounts);
    }
  };

  const loadDatabases = async (account: Account) => {
    if (directory === undefined) {
      console.error("directory is not loaded");
      return;
    }

    const SQL = await initSqlJs({ locateFile: () => sqliteUrl });

    const manifestDatabaseHandle = await directory.getFileHandle("Manifest.db");
    const manifestDatabaseFileBuffer = await (
      await manifestDatabaseHandle.getFile()
    ).arrayBuffer();

    const manifestDatabase = new SQL.Database(
      new Uint8Array(manifestDatabaseFileBuffer),
    );

    databaseTemp.manifest = manifestDatabase;

    let rows: QueryExecResult[];

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "Documents/${account.md5}/session/session.db" AND "flags" = 1`,
    );

    console.log(rows);

    if (rows.length > 0) {
      const fileID = rows[0].values[0][0] as string;
      if (fileID) {
        const filePrefix = fileID.substring(0, 2);
        const filePath = `${filePrefix}/${fileID}`;

        console.log("session.db", filePath);

        const subDirectoryHandle =
          await directory.getDirectoryHandle(filePrefix);

        const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
        const databaseFileBuffer = await (
          await databaseHandle.getFile()
        ).arrayBuffer();
        databaseTemp.session = new SQL.Database(
          new Uint8Array(databaseFileBuffer),
        );
      } else {
        throw new Error("session.db is not found");
      }
    }

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "Documents/${account.md5}/DB/WCDB_Contact.sqlite" AND "flags" = 1`,
    );

    console.log(rows);

    if (rows.length > 0) {
      const fileID = rows[0].values[0][0] as string;
      if (fileID) {
        const filePrefix = fileID.substring(0, 2);
        const filePath = `${filePrefix}/${fileID}`;

        console.log("WCDB_Contact.sqlite", filePath);

        const subDirectoryHandle =
          await directory.getDirectoryHandle(filePrefix);

        const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
        const databaseFileBuffer = await (
          await databaseHandle.getFile()
        ).arrayBuffer();
        databaseTemp.WCDB_Contact = new SQL.Database(
          new Uint8Array(databaseFileBuffer),
        );
      } else {
        throw new Error("WCDB_Contact.sqlite is not found");
      }
    }

    rows = manifestDatabase.exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "Documents/${account.md5}/DB/message_%.sqlite" AND "flags" = 1 ORDER BY "relativePath" ASC`,
    );

    if (rows.length > 0) {
      for (const row of rows[0].values) {
        const fileID = row[0] as string;
        const filePrefix = fileID.substring(0, 2);
        const filePath = `${filePrefix}/${fileID}`;

        console.log("message_%.sqlite", filePath);

        const subDirectoryHandle =
          await directory.getDirectoryHandle(filePrefix);

        const databaseHandle = await subDirectoryHandle.getFileHandle(fileID);
        const databaseFileBuffer = await (
          await databaseHandle.getFile()
        ).arrayBuffer();

        if (databaseTemp.message === undefined) databaseTemp.message = [];

        databaseTemp.message.push(
          new SQL.Database(new Uint8Array(databaseFileBuffer)),
        );
      }
    }

    setDatabases(databaseTemp);
    setAccount(account);
  };

  useEffect(() => {
    return () => {
      for (const databaseName in databases) {
        if (Array.isArray(databases[databaseName as WCDatabaseNames])) {
          for (const db of databases[
            databaseName as WCDatabaseNames
          ] as Database[]) {
            db.close();
          }
        } else {
          (databases[databaseName as WCDatabaseNames] as Database).close();
        }
      }
    };
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        directory,
        loadDirectory,
        loadDatabases,
        databases,
        accountList,
        account,
      }}
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
