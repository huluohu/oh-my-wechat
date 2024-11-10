import type {
  Chat,
  DatabaseSessionAbstractRow,
  Group,
  GroupChat,
  PrivateChat,
  User,
  WCDatabases,
} from "@/lib/schema.ts";
import { ContactController } from "./contact";

export const ChatController = {
  all: async (databases: WCDatabases): Promise<Chat[]> => {
    const db = databases.session;

    if (!db) {
      throw new Error("session database is not found");
    }

    const dbSessionAbstractRows: DatabaseSessionAbstractRow[] = db
      .exec(
        "SELECT rowid, CreateTime, UsrName FROM SessionAbstract ORDER BY CreateTime Desc",
      )[0]
      .values.reduce((acc, cur) => {
        acc.push({
          rowid: cur[0],
          CreateTime: cur[1],
          UsrName: cur[2],
        } as DatabaseSessionAbstractRow);
        return acc;
      }, [] as DatabaseSessionAbstractRow[]);

    const contactRows: Array<User | Group> = await ContactController.in(
      databases,
      dbSessionAbstractRows.map((row) => row.UsrName),
    );

    return dbSessionAbstractRows.map((row) => {
      const chatInfo = contactRows.find((info) => info.id === row.UsrName);
      return row.UsrName.endsWith("@chatroom")
        ? ({
            type: "chatroom",

            id: row.UsrName,
            title: chatInfo ? (chatInfo as Group).title : "-",
            is_pinned: false,
            is_collapsed: false,
            ...(chatInfo?.photo ? { photo: chatInfo.photo.thumb } : {}),
            members: [],

            group: {
              id: row.UsrName,
              title: chatInfo ? (chatInfo as Group).title : "-",
              ...(chatInfo?.photo ? { photo: chatInfo.photo.thumb } : {}),
              members: [],
            },
            raw: {
              row,
              chatInfo,
            },
          } as GroupChat)
        : ({
            type: "private",

            id: row.UsrName,
            title: chatInfo
              ? (chatInfo.remark ?? (chatInfo as User).username)
              : row.UsrName,
            ...(chatInfo?.photo ? { photo: chatInfo.photo.thumb } : {}),
            is_pinned: false,
            is_collapsed: false,
            members: [],
            user: {} as unknown,

            raw: {
              row,
              chatInfo,
            },
          } as PrivateChat);
    });
  },
};
