import { DatabaseName } from "@/lib/schema.ts";
import protobuf from "protobufjs";

const protos = {
  dbContactRemark: {
    nickname: {
      type: "string",
      id: 1,
    },
    id: {
      type: "string",
      id: 2,
    },
    remark: {
      type: "string",
      id: 3,
    },
    remarkPinyin: {
      type: "string",
      id: 4,
    },
    remarkPinyinInits: {
      type: "string",
      id: 5,
    },
    nicknamePinyin: {
      type: "string",
      id: 6,
    },
    field7: {
      type: "string",
      id: 7,
    },
    field8: {
      type: "string",
      id: 8,
    },
  },
};

export const Contact = {
  all: async (databases, cursor: string) => {
    const rows = databases[DatabaseName.WCDB_Contact].exec(
      "SELECT rowid, userName, dbContactRemark, dbContactChatRoom, dbContactHeadImage, type FROM Friend",
    );

    const result = [];

    for (const row of rows[0].values) {
      const [
        rowid,
        userName,
        dbContactRemark,
        dbContactChatRoom,
        dbContactHeadImage,
        type,
      ] = row;

      if (userName.startsWith("gh_")) continue;
      if (type % 2 === 0) continue;

      if (dbContactRemark) {
        try {
          const remarkBuffer = new Uint8Array(dbContactRemark);
          const root = protobuf.Root.fromJSON({
            nested: {
              ContactRemark: {
                fields: protos.dbContactRemark,
              },
            },
          });

          const ContactObject = root.lookupType("ContactRemark");
          const remarkObj = ContactObject.decode(remarkBuffer);

          result.push({
            rowid,
            wxid: userName,
            ...remarkObj,
            type,
          });
        } catch (err) {
          console.error("Error decoding contact remark:", err);
        }
      }
    }

    console.log(result.length);
    return result;
  },
};
