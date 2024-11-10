import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type Attach2MessageEntity = AppMessageEntity<{
  type: AppMessageType.ATTACH_2;
  title: string;
  des: string;
  md5: string;
  laninfo: string;
  appattach: {
    totallen: number;
    fileext: string;
    fileuploadtoken: string;
    status: number;
  };
}>;

interface Attach2MessageProps extends Omit<AppMessageProps, "message"> {
  message: Attach2MessageEntity;
}

export default function Attach2Message({
  message,
  variant = "default",
  direction,
  isChatroom,
}: Attach2MessageProps) {
  return (
    <div>
      <p>局域网文件？: {message.msg.appmsg.title}</p>
    </div>
  );
}
