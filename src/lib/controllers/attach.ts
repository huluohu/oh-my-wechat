import type { ImageMessageEntity } from "@/components/message/image-message.tsx";
import type { PhotpSize, WCDatabases } from "@/lib/schema.ts";
import CryptoJS from "crypto-js";
import { getFileFromManifast as getFilesFromManifast } from "../utils";

export const AttachController = {
  get: async (
    directory: FileSystemDirectoryHandle,
    databases: WCDatabases,
    {
      sessionId,
      messageLocalId,
      messageEntity,
    }: {
      sessionId: string;
      messageLocalId: string;
      messageEntity: ImageMessageEntity;
    },
  ): Promise<PhotpSize[]> => {
    const db = databases.manifest;

    if (!db) {
      throw new Error("manifest database is not found");
    }

    const sessionIdMd5 = CryptoJS.MD5(sessionId).toString();

    const files = await getFilesFromManifast(
      db,
      directory,
      `%/OpenData/${sessionIdMd5}/${messageLocalId}.%`,
    );

    const result: PhotpSize[] = [];

    for (const file of files) {
      if (file.filename.endsWith(".pic")) {
        result.push({
          size: "origin",
          src: URL.createObjectURL(file.file),
        });
      }

      if (file.filename.endsWith(".pic_thum")) {
        result.push({
          size: "thumb",
          src: URL.createObjectURL(file.file),
          width: Number.parseInt(messageEntity.msg.img["@_cdnthumbwidth"]),
          height: Number.parseInt(messageEntity.msg.img["@_cdnthumbwidth"]),
        });
      }
    }

    console.log(result);

    return result;
  },
};
