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
    remarkField7: {
      type: "string",
      id: 7,
    },
    remarkField8: {
      type: "string",
      id: 8,
    },
  },
  dbContactHeadImage: {
    headImageFlag: {
      type: "int32",
      id: 1,
    },
    headImageThumb: {
      type: "string",
      id: 2,
    },
    headImage: {
      type: "string",
      id: 3,
    },
    headImageField4: {
      type: "string",
      id: 4,
    },
  },
  dbContactProfile: {
    profileFlag: {
      type: "int32",
      id: 1,
    },
    profileCountry: {
      type: "string",
      id: 2,
    },
    profileProvince: {
      type: "string",
      id: 3,
    },
    profileCity: {
      type: "string",
      id: 4,
    },
    profileBio: {
      type: "string",
      id: 5,
    },
  },
  dbContactSocial: {
    // socialField1: {
    //   type: "string",
    //   id: 1,
    // },
    // socialField2: {
    //   type: "string",
    //   id: 2,
    // },
    // socialField3: {
    //   type: "int32",
    //   id: 3,
    // },
    // socialField7: {
    //   type: "int32",
    //   id: 7,
    // },

    // socialField8: {
    //   type: "int32",
    //   id: 8,
    // },
    socialBackground: {
      type: "string",
      id: 9,
    },
    // socialField10: {
    //   type: "string",
    //   id: 10,
    // },
    socialPhone: {
      type: "string",
      id: 11,
    },
    // socialField12: {
    //   type: "string",
    //   id: 12,
    // },
  },
};

export const Contact = {
  all: async (databases, cursor: string) => {
    const rows = databases[DatabaseName.WCDB_Contact].exec(
      "SELECT rowid, userName, dbContactRemark, dbContactChatRoom, dbContactHeadImage, dbContactProfile, dbContactSocial, type FROM Friend",
    );

    const result = [];

    for (const row of rows[0].values) {
      const [
        rowid,
        userName,
        dbContactRemark,
        dbContactChatRoom,
        dbContactHeadImage,
        dbContactProfile,
        dbContactSocial,
        type,
      ] = row;

      if (userName.startsWith("gh_")) continue;
      if (type % 2 === 0) continue;

      if (dbContactRemark) {
        try {
          const root = protobuf.Root.fromJSON({
            nested: {
              ContactRemark: {
                fields: protos.dbContactRemark,
              },
              HeadImage: {
                fields: protos.dbContactHeadImage,
              },
              Profile: {
                fields: protos.dbContactProfile,
              },
              Social: {
                fields: protos.dbContactSocial,
              },
            },
          });

          const remarkBuffer = new Uint8Array(dbContactRemark);
          const headImageBuffer = new Uint8Array(dbContactHeadImage);
          const profileBuffer = new Uint8Array(dbContactProfile);
          const socialBuffer = new Uint8Array(dbContactSocial);

          const remarkObj = root
            .lookupType("ContactRemark")
            .decode(remarkBuffer);
          const headImageObj = root
            .lookupType("HeadImage")
            .decode(headImageBuffer);
          const profileObj = root.lookupType("Profile").decode(profileBuffer);
          const socialObj = root.lookupType("Social").decode(socialBuffer);

          result.push({
            rowid,
            wxid: userName,
            ...remarkObj,
            ...headImageObj,
            ...profileObj,
            ...socialObj,
            type,
          });
        } catch (err) {
          console.error("Error decoding contact remark:", err);
        }
      }
    }

    return result;
  },
};
