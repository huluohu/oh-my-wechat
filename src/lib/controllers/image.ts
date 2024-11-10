import { DatabaseName } from "@/lib/schema.ts";
import CryptoJS from "crypto-js";
import type { QueryExecResult } from "sql.js";

export const Image = {
  get: async (dictionary, database, { session, id }) => {
    const sessionIdMd5 = CryptoJS.MD5(session).toString();

    let rows: QueryExecResult[];

    rows = database[DatabaseName.manifest].exec(
      `SELECT * FROM "Files" WHERE "domain" = "AppDomain-com.tencent.xin" AND "relativePath" LIKE "%/Img/${sessionIdMd5}/${id}%.pic" AND "flags" = 1`,
    );

    console.log(rows);

    if (rows.length > 0) {
      const fileID = rows[0].values[0][0];
      const filePrefix = fileID.substring(0, 2);
      const filePath = `${filePrefix}/${fileID}`;

      const subDirectoryHandle =
        await dictionary.getDirectoryHandle(filePrefix);

      const imageHandle = await subDirectoryHandle.getFileHandle(fileID);

      const imageUrl = URL.createObjectURL(await imageHandle.getFile());

      return imageUrl;
    }

    return null;
  },
};
