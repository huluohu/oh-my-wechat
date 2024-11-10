import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type TextMessageEntity = AppMessageEntity<{
  type: AppMessageType.TEXT;
  title: string;
  des: string; // eg. a link
}>;

interface TextMessageProps extends Omit<AppMessageProps, "message"> {
  message: TextMessageEntity;
}

export default function TextMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: TextMessageProps) {
  return (
    <div>
      <p>文本: {message.msg.appmsg.title})</p>
    </div>
  );
}
