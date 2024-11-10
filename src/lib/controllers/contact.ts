import {
  type DatabaseFriendRow,
  type Group,
  type User,
  WCDatabaseNames,
  type WCDatabases,
} from "@/lib/schema.ts";
import protobuf from "protobufjs";

const dbContactPprotos = {
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
  dbContactChatRoom: {
    chatroomMemberIds: {
      type: "string",
      id: 1,
    },
    chatroomOwnerIds: {
      type: "string",
      id: 2,
    },
    chatroomaMaxCount: {
      type: "uint32",
      id: 4,
    },
    chatroomVersion: {
      type: "uint32",
      id: 5,
    },
    chatroomMember: {
      type: "string", // xml
      id: 6,
    },
  },
};
const dbContactProtobufRoot = protobuf.Root.fromJSON({
  nested: {
    ContactRemark: {
      fields: dbContactPprotos.dbContactRemark,
    },
    HeadImage: {
      fields: dbContactPprotos.dbContactHeadImage,
    },
    Profile: {
      fields: dbContactPprotos.dbContactProfile,
    },
    Social: {
      fields: dbContactPprotos.dbContactSocial,
    },
  },
});

export const ContactController = {
  all: async (databases: WCDatabases): Promise<User[]> => {
    const db = databases.WCDB_Contact;

    if (!db) {
      throw new Error("WCDB_Contact database is not found");
    }

    const dbFriendRows: DatabaseFriendRow[] = db
      .exec(
        "SELECT rowid, userName, dbContactRemark, dbContactChatRoom, dbContactHeadImage, dbContactProfile, dbContactSocial, type FROM Friend WHERE (type & 1) != 0",
      )[0]
      .values.reduce((acc, cur) => {
        acc.push({
          rowid: cur[0],
          userName: cur[1],
          dbContactRemark: cur[2],
          dbContactChatRoom: cur[3],
          dbContactHeadImage: cur[4],
          dbContactProfile: cur[5],
          dbContactSocial: cur[6],
          type: cur[7],
        } as DatabaseFriendRow);
        return acc;
      }, [] as DatabaseFriendRow[]);

    return dbFriendRows.reduce((acc, cur) => {
      switch (true) {
        case cur.userName.startsWith("gh_"): // 公众号
          // case cur.type % 2 === 1: // 群组
          return acc;
        default: {
          // @ts-ignore
          const remarkObj: { [key: string]: unknown } = dbContactProtobufRoot
            .lookupType("ContactRemark")
            .decode(cur.dbContactRemark);
          // @ts-ignore
          const headImageObj: { [key: string]: unknown } = dbContactProtobufRoot
            .lookupType("HeadImage")
            .decode(cur.dbContactHeadImage);
          // @ts-ignore
          const profileObj: { [key: string]: unknown } = dbContactProtobufRoot
            .lookupType("Profile")
            .decode(cur.dbContactProfile);
          // @ts-ignore
          const socialObj: { [key: string]: unknown } = dbContactProtobufRoot
            .lookupType("Social")
            .decode(cur.dbContactSocial);

          acc.push({
            id: cur.userName,
            user_id: remarkObj.id as string,
            username: remarkObj.nickname as string,
            bio: profileObj.profileBio as string,
            photo: {
              thumb: headImageObj.headImageThumb as string,
              origin: headImageObj.headImage as string,
            },
            // raw: {
            //   ...cur,
            //   ...remarkObj,
            //   ...headImageObj,
            //   ...profileObj,
            //   ...socialObj,
            // },
          });

          return acc;
        }
      }
    }, [] as User[]);
  },

  in: async (
    databases: WCDatabases,
    ids: string[],
  ): Promise<Array<User | Group>> => {
    const db = databases.WCDB_Contact;

    if (!db) {
      throw new Error("WCDB_Contact database is not found");
    }

    const dbFriendRows: DatabaseFriendRow[] = db
      .exec(
        "SELECT rowid, userName, dbContactRemark, dbContactChatRoom, dbContactHeadImage, dbContactProfile, dbContactSocial, type FROM Friend",
      )[0]
      .values.reduce((acc, cur) => {
        acc.push({
          rowid: cur[0],
          userName: cur[1],
          dbContactRemark: cur[2],
          dbContactChatRoom: cur[3],
          dbContactHeadImage: cur[4],
          dbContactProfile: cur[5],
          dbContactSocial: cur[6],
          type: cur[7],
        } as DatabaseFriendRow);
        return acc;
      }, [] as DatabaseFriendRow[]);

    return dbFriendRows.reduce(
      (acc, cur) => {
        switch (true) {
          case cur.userName.startsWith("gh_"):
          case !ids.includes(cur.userName):
            return acc;
          default: {
            // @ts-ignore
            const remarkObj: { [key: string]: unknown } = dbContactProtobufRoot
              .lookupType("ContactRemark")
              .decode(cur.dbContactRemark);
            // @ts-ignore
            const headImageObj: { [key: string]: unknown } =
              dbContactProtobufRoot
                .lookupType("HeadImage")
                .decode(cur.dbContactHeadImage);
            // @ts-ignore
            const profileObj: { [key: string]: unknown } = dbContactProtobufRoot
              .lookupType("Profile")
              .decode(cur.dbContactProfile);
            // @ts-ignore
            const socialObj: { [key: string]: unknown } = dbContactProtobufRoot
              .lookupType("Social")
              .decode(cur.dbContactSocial);

            if (cur.userName.endsWith("@chatroom")) {
              acc.push({
                id: cur.userName,
                title: (remarkObj.nickname as string).length
                  ? remarkObj.nickname
                  : "群聊",
                ...((remarkObj.remark as string).length
                  ? {
                      remark: remarkObj.remark,
                    }
                  : {}),
                ...(headImageObj.headImageThumb
                  ? {
                      photo: {
                        thumb: headImageObj.headImageThumb,
                      },
                    }
                  : {}),
                members: [],

                raw: {
                  ...cur,
                  ...remarkObj,
                  ...headImageObj,
                  ...profileObj,
                  ...socialObj,
                  // .lookupType("Chatroom")
                  // .decode(cur.dbContactChatRoom),
                },
              } as Group);
            } else {
              acc.push({
                id: cur.userName,
                user_id: remarkObj.id,
                username: remarkObj.nickname,
                ...((remarkObj.remark as string).length
                  ? {
                      remark: remarkObj.remark,
                    }
                  : {}),
                bio: profileObj.profileBio,

                ...(headImageObj.headImageThumb
                  ? {
                      photo: {
                        thumb: headImageObj.headImageThumb,
                      },
                    }
                  : {}),

                raw: {
                  ...cur,
                  ...remarkObj,
                  ...headImageObj,
                  ...profileObj,
                  ...socialObj,
                },
              } as User);
            }
            return acc;
          }
        }
      },
      [] as Array<User | Group>,
    );
  },
};
