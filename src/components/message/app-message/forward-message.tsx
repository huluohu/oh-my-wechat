import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type ForwardMessageEntity = AppMessageEntity<{
  type: AppMessageType.FORWARD_MESSAGE;
  title: string;
  des: string;
  recorditem: string;
  appattach: {
    attachid: string;
    cdnthumburl: string;
    cdnthumbmd5: string;
    cdnthumblength: number;
    cdnthumbheight: number;
    cdnthumbwidth: number;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: number;
    fileext: string;
    islargefilemsg: number;
  };
  md5: string;
}>;

interface ForwardMessageProps extends Omit<AppMessageProps, "message"> {
  message: ForwardMessageEntity;
}

export default function ForwardMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ForwardMessageProps) {
  return (
    <div>
      <p>转发消息：{message.msg.appmsg.des})</p>
    </div>
  );
}
