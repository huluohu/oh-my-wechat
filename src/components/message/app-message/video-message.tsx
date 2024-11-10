import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface VideoMessageEntity {
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
}

type VideoMessageProps = AppMessageProps<VideoMessageEntity>;

export default function VideoMessage({ message, ...props }: VideoMessageProps) {
  return (
    <div {...props}>
      <p>视频: {message.message_entity.msg.appmsg.des})</p>
      <p> from: {message.message_entity.msg.appinfo.appname}</p>
    </div>
  );
}
