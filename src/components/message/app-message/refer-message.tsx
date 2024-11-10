import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type ReferMessageEntity = AppMessageEntity<{
  type: AppMessageType.REFER;
  title: string;
  refermsg: {
    type: number;
    svrid: string;
    fromusr: string;
    chatusr: string;
    displayname: string;
    msgsource: string; // xml
    content: string;
  };
}>;

interface ReferMessageProps extends Omit<AppMessageProps, "message"> {
  message: ReferMessageEntity;
}

export default function ReferMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ReferMessageProps) {
  return (
    <div>
      <p>
        {message.msg.appmsg.title} ([{message.msg.appmsg.refermsg.type}]
        {message.msg.appmsg.refermsg.displayname}:
        {message.msg.appmsg.refermsg.content})
      </p>
    </div>
  );
}
