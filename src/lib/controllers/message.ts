import type { AppMessageEntity } from "@/components/message/app-message.tsx";
import type { ReferMessageEntity } from "@/components/message/app-message/refer-message.tsx";
import type { ChatroomVoipMessageEntity } from "@/components/message/chatroom-voip-message.tsx";
import type { ContactMessageEntity } from "@/components/message/contact-message.tsx";
import type { ImageMessageEntity } from "@/components/message/image-message.tsx";
import type { LocationMessageEntity } from "@/components/message/location-message.tsx";
import type { MicroVideoMessageEntity } from "@/components/message/micro-video-message.tsx";
import type { StickerMessageEntity } from "@/components/message/sticker-message.tsx";
import type { SystemExtendedMessageEntity } from "@/components/message/system-extended-message.tsx";
import type { SystemMessageEntity } from "@/components/message/system-message.tsx";
import type { VideoMessageEntity } from "@/components/message/video-message.tsx";
import type { VoiceMessageEntity } from "@/components/message/voice-message.tsx";
import type { VoipMessageEntity } from "@/components/message/voip-message.tsx";
import { ContactController } from "@/lib/controllers/contact.ts";
import {
  type AppMessage,
  AppMessageType,
  type Chat,
  type ChatroomVoipMessage,
  type ContactMessage,
  type ControllerPaginatorResult,
  type ControllerResult,
  type DatabaseMessageRow,
  Group,
  type ImageMessage,
  type LocationMessage,
  type Message,
  MessageDirection,
  MessageType,
  type MicroVideoMessage,
  type StickerMessage,
  type SystemExtendedMessage,
  type SystemMessage,
  type TextMessage,
  type User,
  type VideoMessage,
  type VoiceMessage,
  type VoipMessage,
  type WCDatabases,
} from "@/lib/schema.ts";
import CryptoJS from "crypto-js";
import { XMLParser } from "fast-xml-parser";

export const MessageController = {
  parseRawMessageRows: async (
    raw_message_rows: DatabaseMessageRow[],
    {
      chat,
      databases,
      parseReplyMessage = true,
    }: {
      chat: Chat;
      databases: WCDatabases;
      parseReplyMessage?: boolean;
    },
  ): Promise<Message[]> => {
    const messageSenderIds: string[] = raw_message_rows.map(
      (raw_message_row) => {
        if (chat.type === "chatroom") {
          let senderId: string = "";
          let rawMessageContent: string = "";

          if (
            raw_message_row.Des === MessageDirection.outgoing ||
            raw_message_row.Message.startsWith("<")
          ) {
            rawMessageContent = raw_message_row.Message;
          } else {
            [senderId, rawMessageContent] = raw_message_row.Message.split(
              ":\n",
              2,
            );
          }

          raw_message_row.Message = rawMessageContent;

          return senderId;
        }

        return raw_message_row.Des === MessageDirection.incoming
          ? chat.id
          : "0"; // TODO
      },
    );
    const usersArray = await ContactController.in(databases, messageSenderIds);
    const usersTable: { [key: string]: User | Group } = {};
    usersArray.map((user) => {
      usersTable[user.id] = user;
    });

    const messageIndexesHasReplyMessage: number[] = [];
    const replyMessageIds = {};

    const messages = raw_message_rows.map((raw_message_row, index) => {
      const message = {
        id: raw_message_row.MesSvrID,
        local_id: raw_message_row.MesLocalID,
        type: raw_message_row.Type,
        date: raw_message_row.CreateTime,
        direction: raw_message_row.Des,
        from: usersTable[messageSenderIds[index]],
        chat,
        // message_entity,
        // reply_to_message?: Message;
        raw_message: raw_message_row.Message,
      };

      const xmlParser = new XMLParser({
        ignoreAttributes: false,
      });

      switch (raw_message_row.Type) {
        case MessageType.TEXT: {
          return {
            ...message,
            message_entity: raw_message_row.Message,
          } as TextMessage;
        }

        case MessageType.IMAGE: {
          const messageEntity: ImageMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );
          return {
            ...message,
            message_entity: messageEntity,
          } as ImageMessage;
        }

        case MessageType.VOICE: {
          const messageEntity: VoiceMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );
          return {
            ...message,
            message_entity: messageEntity,
          } as VoiceMessage;
        }

        case MessageType.CONTACT: {
          const messageEntity: ContactMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );
          return {
            ...message,
            message_entity: messageEntity,
          } as ContactMessage;
        }

        case MessageType.VIDEO: {
          const messageEntity: VideoMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );
          return {
            ...message,
            message_entity: messageEntity,
          } as VideoMessage;
        }

        case MessageType.STICKER: {
          const messageEntity: StickerMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );
          return {
            ...message,
            message_entity: messageEntity,
          } as StickerMessage;
        }

        case MessageType.LOCATION: {
          const messageEntity: LocationMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );

          return {
            ...message,
            message_entity: messageEntity,
          } as LocationMessage;
        }

        case MessageType.APP: {
          const messageEntity: AppMessageEntity<{ type: number }> = xmlParser.parse(
            raw_message_row.Message,
          );

          if (messageEntity.msg.appmsg.type === AppMessageType.REFER) {
            messageIndexesHasReplyMessage.push(index);

            const replyMessageId = (messageEntity as AppMessageEntity<ReferMessageEntity>)
              .msg.appmsg.refermsg.svrid;
            replyMessageIds[replyMessageId] = undefined;
          }

          return {
            ...message,
            message_entity: messageEntity,
          } as AppMessage<ReferMessageEntity>;
        }

        case MessageType.VOIP: {
          const messageEntity: VoipMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );

          return {
            ...message,
            message_entity: messageEntity,
          } as VoipMessage;
        }

        case MessageType.MICROVIDEO: {
          const messageEntity: MicroVideoMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );

          return {
            ...message,
            message_entity: messageEntity,
          } as MicroVideoMessage;
        }

        case MessageType.GROUP_VOIP: {
          const messageEntity: ChatroomVoipMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );

          return {
            ...message,
            message_entity: messageEntity,
          } as ChatroomVoipMessage;
        }

        case MessageType.SYSTEM: {
          const messageEntity: SystemMessageEntity = raw_message_row.Message;

          return {
            ...message,
            message_entity: messageEntity,
          } as SystemMessage;
        }

        case MessageType.SYSTEM_EXTENDED: {
          const messageEntity: SystemExtendedMessageEntity = xmlParser.parse(
            raw_message_row.Message,
          );

          return {
            ...message,
            message_entity: messageEntity,
          } as SystemExtendedMessage;
        }

        default: {
          const messageEntity: string = `不支持: ${raw_message_row.Message}`;

          return {
            ...message,
            message_entity: messageEntity,
          };
        }
      }
    });
    let replyMessageArray: Message[] = [];

    if (parseReplyMessage && Object.keys(replyMessageIds).length) {
      replyMessageArray = (
        await MessageController.in(databases, {
          chat,
          messageIds: Object.keys(replyMessageIds),
        })
      ).data;

      const replyMessageTable: { [key: string]: Message } = {};
      replyMessageArray.map((message) => {
        replyMessageTable[message.id] = message;
      });

      Object.keys(replyMessageIds).forEach((i) => {
        // @ts-ignore
        messages[i].reply_to_message =
          replyMessageIds[i];
      });
    }

    return messages as Message[];
  },

  all: async (
    databases: WCDatabases,
    { chat, cursor }: { chat: Chat; cursor?: number },
  ): Promise<ControllerPaginatorResult<Message[]>> => {
    const dbs = databases.message;
    if (!dbs) {
      throw new Error("message databases are not found");
    }

    const sessionIdMd5 = CryptoJS.MD5(chat.id).toString();
    cursor ??= Date.now();

    const rows = [
      ...dbs.map((database) => {
        try {
          return database.exec(`
            SELECT 
                rowid, CreateTime, Des, ImgStatus, MesLocalID, Message, CAST (MesSvrID as TEXT) as MesSvrID, Status, TableVer, Type 
            FROM 
                Chat_${sessionIdMd5} 
            WHERE 
                createTime < ${cursor} 
            ORDER BY createTime DESC 
            LIMIT 50;
          `);
        } catch (e) {
          return [];
        }
      }),
    ].filter((row) => row.length > 0)[0];

    const raw_message_rows: DatabaseMessageRow[] = [];

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
      ] = row as [
        number,
        number,
        MessageDirection,
        1 | 2,
        string,
        string,
        string,
        number,
        number,
        number,
      ];

      raw_message_rows.push({
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

    return {
      data: await MessageController.parseRawMessageRows(raw_message_rows, {
        chat,
        databases,
      }),
      meta: {
        cursor,
        ...(raw_message_rows.length > 0
          ? {
              next_cursor:
                raw_message_rows[raw_message_rows.length - 1].CreateTime,
            }
          : {}),
      },
    };
  },

  in: async (
    databases: WCDatabases,
    { chat, messageIds }: { chat: Chat; messageIds: string[] },
  ): Promise<ControllerResult<Message[]>> => {
    const dbs = databases.message;
    if (!dbs) {
      throw new Error("message databases are not found");
    }

    const sessionIdMd5 = CryptoJS.MD5(chat.id).toString();

    const rows = [
      ...dbs.map((database) => {
        try {
          return database.exec(`
            SELECT 
                rowid, CreateTime, Des, ImgStatus, MesLocalID, Message, CAST (MesSvrID as TEXT) as MesSvrID, Status, TableVer, Type 
            FROM 
                Chat_${sessionIdMd5} 
            WHERE 
                MesSvrID IN (${messageIds.map((id) => `'${id}'`).join(",")});
            ;
          `);
        } catch (e) {
          console.error(e);
          return [];
        }
      }),
    ].filter((row) => row.length > 0)[0];


    const raw_message_rows: DatabaseMessageRow[] = [];

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
      ] = row as [
        number,
        number,
        MessageDirection,
        1 | 2,
        string,
        string,
        string,
        number,
        number,
        number,
      ];

      raw_message_rows.push({
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

    return {
      data: await MessageController.parseRawMessageRows(raw_message_rows, {
        chat,
        databases,
        parseReplyMessage: false,
      }),
    };
  },
};
