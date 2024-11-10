import { DatabaseName } from "@/lib/schema.ts";
import { Contact } from "./contact";

export const Session = {
  all: async (databases, cursor: string) => {
    const sessionRows = databases[DatabaseName.session]
      .exec(
        "SELECT rowid, CreateTime, unreadcount, UsrName FROM SessionAbstract ORDER BY CreateTime Desc",
      )[0]
      .values.map((row) => {
        const [rowid, CreateTime, unreadcount, UsrName] = row;
        return {
          rowid,
          wxid: UsrName,
          CreateTime,
          unreadcount,
          UsrName,
        };
      });

    const contactRows = await Contact.all(databases);

    const combineRows = sessionRows.map((sessionRow) => {
      const contactRow = contactRows.find((i) => i.wxid === sessionRow.wxid);
      return {
        ...sessionRow,
        ...contactRow,
      };
    });

    combineRows.sort((a, b) => {
      return (
        (contactRows.find((i) => i.wxid === a.wxid)?.order ?? 99999) -
        (contactRows.find((i) => i.wxid === b.wxid)?.order ?? 99999)
      );
    });

    return combineRows;
  },
};
