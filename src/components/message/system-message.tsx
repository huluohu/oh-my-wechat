import type { MessageProp } from "@/components/message/message.tsx";

interface SystemMessageProp extends MessageProp {}

export default function SystemMessage({ message }: SystemMessageProp) {
  return (
    <div className="text-sm text-center text-pretty">
      <span className="px-2 py-0.5 box-decoration-clone rounded-full bg-neutral-300">
        {message.Message}
      </span>
    </div>
  );
}
