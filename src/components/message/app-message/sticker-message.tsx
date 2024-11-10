import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type StickerMessageEntity = AppMessageEntity<{
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
}>;

interface StickerMessageProps extends Omit<AppMessageProps, "message"> {
  message: StickerMessageEntity;
}

export default function StickerMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: StickerMessageProps) {
  return (
    <div>
      <p>表情</p>
    </div>
  );
}
