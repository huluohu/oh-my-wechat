import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface StickerMessageProps extends MessageProp {
  variant: "default" | "referenced";
}
interface StickerMessageEntity {
  msg: {
    emoji: {
      "@_fromusername": string;
      "@_tousername": string;
      "@_type": string;
      "@_idbuffer": string;
      "@_md5": string;
      "@_len": string;
      "@_productid": string;
      "@_androidmd5": string;
      "@_androidlen": string;

      "@_s60v3md5": string;
      "@_s60v3len": string;
      "@_s60v5md5": string;
      "@_s60v5len": string;

      "@_cdnurl": string;
      "@_designerid": string;
      "@_thumburl": string;
      "@_encrypturl": string;
      "@_aeskey": string;

      "@_externurl": string;
      "@_externmd5": string;

      "@_width": string;
      "@_height": string;

      "@_tpurl": string;
      "@_tpauthkey": string;
      "@_attachedtext": string;
      "@_attachedtextcolor": string;
      "@_lensid": string;
      "@_emojiattr": string;
      "@_linkid": string;
      "@_desc": string;
    };

    gameext: {
      "@_type": string;
      "@_content": string;
    };
  };
}

export default function StickerMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: StickerMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: StickerMessageEntity = xmlParser.parse(message.Message);
  return (
    <div className="">sticker(md5): {messageEntity.msg.emoji["@_md5"]}</div>
  );
}
