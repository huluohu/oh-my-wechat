import type { MessageProp } from "@/components/message/message.tsx";
import type { StickerMessage as StickerMessageVM } from "@/lib/schema.ts";

interface StickerMessageProps extends MessageProp<StickerMessageVM> {
  variant: "default" | "referenced";
}

export interface StickerMessageEntity {
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
  ...props
}: StickerMessageProps) {
  return (
    <div className="" {...props}>
      sticker(md5): {message.message_entity.msg.emoji["@_md5"]}
    </div>
  );
}
