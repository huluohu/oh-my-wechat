import _global from "@/lib/global.ts";
import type {
  Chatroom,
  ControllerResult,
  DatabaseFriendRow,
  User,
  WCDatabases,
} from "@/lib/schema.ts";
import protobuf from "protobufjs";

const dbContactProtos = {
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
      fields: dbContactProtos.dbContactRemark,
    },
    HeadImage: {
      fields: dbContactProtos.dbContactHeadImage,
    },
    Profile: {
      fields: dbContactProtos.dbContactProfile,
    },
    Social: {
      fields: dbContactProtos.dbContactSocial,
    },
    Chatroom: {
      fields: dbContactProtos.dbContactChatRoom,
    },
  },
});

export const ContactController = {
  parseDatabaseContactRows: async (
    databases: WCDatabases,
    raw_contact_rows: DatabaseFriendRow[],
  ): Promise<(User | Chatroom)[]> => {
    const allMemberIds: string[] = [];

    const resultWithoutMembers = raw_contact_rows.map((row) => {
      // @ts-ignore
      const remarkObj: { [key: string]: unknown } = dbContactProtobufRoot
        .lookupType("ContactRemark")
        .decode(row.dbContactRemark);
      // @ts-ignore
      const headImageObj: { [key: string]: unknown } = dbContactProtobufRoot
        .lookupType("HeadImage")
        .decode(row.dbContactHeadImage);
      // @ts-ignore
      const profileObj: { [key: string]: unknown } = dbContactProtobufRoot
        .lookupType("Profile")
        .decode(row.dbContactProfile);
      // @ts-ignore
      const socialObj: { [key: string]: unknown } = dbContactProtobufRoot
        .lookupType("Social")
        .decode(row.dbContactSocial);
      // @ts-ignore
      const chatroomObj: { [key: string]: unknown } | undefined =
        row.dbContactChatRoom
          ? dbContactProtobufRoot
              .lookupType("Chatroom")
              .decode(row.dbContactChatRoom)
          : undefined;

      const specialUser = [
        {
          id: "brandsessionholder",
          username: "订阅号消息",
        },
        {
          id: "notification_messages",
          username: "服务消息",
        },
        {
          id: "brandsessionholder_weapp",
          username: "小程序客服消息",
        },
        {
          id: "opencustomerservicemsg",
          username: "小程序客服消息",
        },
        { id: "chatroom_session_box", username: "折叠的群聊" },
      ];

      if (row.userName.endsWith("@chatroom")) {
        let memberIds: string[] = [];

        if (chatroomObj?.chatroomMemberIds) {
          memberIds = (chatroomObj.chatroomMemberIds as string).split(";");
          allMemberIds.push(...memberIds);
        }

        return {
          id: row.userName,
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

          _is_pinned: !!((row.type >> 11) & 1),
          _is_collapsed: !!((row.type >> 28) & 1),
          _member_ids: memberIds,

          raw: {
            ...row,
            ...remarkObj,
            ...headImageObj,
            ...profileObj,
            ...socialObj,
            ...chatroomObj,
          },
        } as Omit<Chatroom, "members"> & {
          _is_pinned: boolean;
          _is_collapsed: boolean;
          _member_ids: string[];
        };
      }

      return {
        id: row.userName,
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

        background: socialObj.socialBackground,

        ...(socialObj.phone
          ? {
              phone: socialObj.phone,
            }
          : {}),

        _is_pinned: !!((row.type >> 11) & 1),

        raw: {
          ...row,
          ...remarkObj,
          ...headImageObj,
          ...profileObj,
          ...socialObj,
        },
      } as User;
    });

    const allMembers: User[] = (
      await ContactController.in(databases, {
        ids: Array.from(new Set(allMemberIds)),
      })
    ).data as User[];

    // 加入当前登录的微信账号数据
    if (_global.user && allMemberIds.indexOf(_global.user.id) > -1) {
      allMembers.push(_global.user);
    }

    const allMembersTable: { [key: string]: User } = {};
    for (const member of allMembers) {
      allMembersTable[member.id] = member;
    }

    const result: (User | Chatroom)[] = resultWithoutMembers.map((item) => {
      if (item.id.endsWith("@chatroom")) {
        // @ts-ignore
        item.members = (item as Omit<Chatroom, "members">)._member_ids
          .map((memberId: string) => allMembersTable[memberId])
          .filter((member: User) => member);

        return item as unknown as Chatroom;
      }

      return item as User;
    });

    return result;
  },

  all: async (
    databases: WCDatabases,
  ): Promise<ControllerResult<(User | Chatroom)[]>> => {
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

    return {
      data: await ContactController.parseDatabaseContactRows(
        databases,
        dbFriendRows.filter((row) => {
          if (row.userName.startsWith("gh_")) return false;
          return true;
        }),
      ),
    };
  },

  // 考虑到批量获取联系人可能很多，如果用 IN 查询，可能会导致 SQL 语句过长
  in: async (
    databases: WCDatabases,
    { ids }: { ids: string[] },
  ): Promise<ControllerResult<(User | Chatroom)[]>> => {
    const db = databases.WCDB_Contact;
    if (!db) {
      throw new Error("WCDB_Contact database is not found");
    }

    if (ids.length === 0) return { data: [] };

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

    return {
      data: [
        ...(ids.indexOf(_global.user!.id) > -1 ? [_global.user as User] : []),
        ...(await ContactController.parseDatabaseContactRows(
          databases,
          dbFriendRows.filter((row) => {
            if (ids.includes(row.userName)) return true;
            return false;
          }),
        )),
      ],
    };
  },
};
