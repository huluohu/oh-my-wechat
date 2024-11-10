import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface AppTextMessageEntity {
  type: AppMessageType.TEXT;
  title: string;
  des: string; // eg. a link
}

type TextMessageProps = AppMessageProps<AppTextMessageEntity>;

export default function TextMessage({ message, ...props }: TextMessageProps) {
  return (
    <div {...props}>
      <p>文本: {message.message_entity.msg.appmsg.title})</p>
    </div>
  );
}
