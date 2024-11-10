import { DatabaseName } from "@/lib/schema.ts";
import CryptoJS from "crypto-js";

export const Message = {
  all: async (databases, id: string, cursor: string) => {
    const idMd5 = CryptoJS.MD5(id).toString();

    const rows = [
      ...databases[DatabaseName.message].map((database) => {
        try {
          return database.exec(
            `SELECT rowid, * FROM Chat_${idMd5} ORDER BY createTime ASC LIMIT 200`,
          );
        } catch (e) {
          return [];
        }
      }),
    ].filter((row) => row.length > 0)[0];

    const result = [];

    for (const row of rows[0].values) {
      const [
        rowid,
        CreateTime,
        Des,
        ImgStatus,
        MesLocalID,
        Message,
        MesSvrID,
        Status,
        TableVer,
        Type,
      ] = row;

      result.push({
        rowid,
        CreateTime,
        Des,
        ImgStatus,
        MesLocalID,
        Message,
        MesSvrID,
        Status,
        TableVer,
        Type,
      });
    }
;
    return result;
  },
};
