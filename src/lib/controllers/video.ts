import type { Chat, MessageVM, VideoInfo, WCDatabases } from "@/lib/schema.ts";
import CryptoJS from "crypto-js";
import { getFilesFromManifast } from "../utils";

export const VideoController = {
  get: async (
    directory: FileSystemDirectoryHandle,
    databases: WCDatabases,
    {
      chat,
      message,
    }: {
      chat: Chat;
      message: MessageVM;
    },
  ): Promise<VideoInfo> => {
    const db = databases.manifest;
    if (!db) throw new Error("manifest database is not found");

    const files = await getFilesFromManifast(
      db,
      directory,
      `%/Video/${CryptoJS.MD5(chat.id).toString()}/${message.local_id}.%`,
    );

    let result: VideoInfo = {
      poster: "",
    };

    for (const file of files) {
      if (file.filename.endsWith(".mp4")) {
        result = {
          ...result,
          src: URL.createObjectURL(file.file),
        };
      }

      if (file.filename.endsWith(".video_thum")) {
        result = {
          ...result,
          poster: URL.createObjectURL(file.file),

          // poster_width: Number.parseInt(
          //   messageEntity.msg.videomsg["@_cdnthumbwidth"],
          // ),
          // poster_height: Number.parseInt(
          //   messageEntity.msg.videomsg["@_cdnthumbheight"],
          // ),
        };
      }
    }

    return result;
  },
};
