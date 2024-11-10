import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface Attach2MessageEntity {
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
}

type Attach2MessageProps = AppMessageProps<Attach2MessageEntity>;

export default function Attach2Message({
  message,
  ...props
}: Attach2MessageProps) {
  return (
    <div {...props}>
      <p>局域网文件？: {message.message_entity.msg.appmsg.title}</p>
    </div>
  );
}
