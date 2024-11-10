import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type VideoMessageEntity = AppMessageEntity<{
  type: AppMessageType.VIDEO;
  title: string;
  des: string;
  url: string;
  lowurl: string;
  appattach: {
    totallen: number;
    attachid: string;
    emoticonmd5: string;
    fileext: string;
    cdnthumburl: string;
    cdnthumbmd5: string;
    cdnthumblength: number;
    cdnthumbwidth: number;
    cdnthumbheight: number;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: 0 | 1;
    filekey: string;
  };
}>;

interface VideoMessageProps extends Omit<AppMessageProps, "message"> {
  message: VideoMessageEntity;
}

export default function VideoMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: VideoMessageProps) {
  return (
    <div>
      <p>视频: {message.msg.appmsg.des})</p>
      <p> from: {message.msg.appinfo.appname}</p>
    </div>
  );
}
