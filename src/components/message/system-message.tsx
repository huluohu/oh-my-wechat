import type { MessageProp } from "@/components/message/message.tsx";
import type { SystemMessage as SystemMessageVM } from "@/lib/schema.ts";

type SystemMessageProp = MessageProp<SystemMessageVM>;

export type SystemMessageEntity = string;

export default function SystemMessage({
  message,
  ...props
}: SystemMessageProp) {
  return (
    <div className="text-sm text-center text-pretty" {...props}>
      <span className="px-2 py-1 box-decoration-clone">
        {message.message_entity}
      </span>
    </div>
  );
}
