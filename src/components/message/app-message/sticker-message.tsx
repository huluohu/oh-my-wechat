import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface StickerMessageEntity {
  type: AppMessageType.STICKER;
  title: string;
  appattach: {
    totallen: number;
    attachid: string;
    cdnattachurl: string;
    emoticonmd5: string;
    aeskey: string;
    fileext: string;
    islargefilemsg: number;
    cdnthumburl: string;
    cdnthumbaeskey: string;
    cdnthumblength: number;
    cdnthumbwidth: number;
    cdnthumbheight: number;
    cdnthumbmd5: string;
  };
}

type StickerMessageProps = AppMessageProps<StickerMessageEntity>;

export default function StickerMessage({
  message,
  ...props
}: StickerMessageProps) {
  return (
    <div {...props}>
      <p>表情 {message.message_entity.msg.appmsg.title}</p>
    </div>
  );
}
