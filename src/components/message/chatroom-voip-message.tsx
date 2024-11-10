import type { MessageProp } from "@/components/message/message.tsx";
import type { ChatroomVoipMessage as ChatroomVoipMessageVM } from "@/lib/schema.ts";

interface ChatroomVoipMessageProps extends MessageProp<ChatroomVoipMessageVM> {
  variant: "default" | "referenced";
}

export interface ChatroomVoipMessageEntity {
  msgLocalID: number;
  clientGroupID: string;
  groupID: string;
  lastMsgID: number;
  msgContent: string; // eg. "XXX has started a voice call"
}
export default function ChatroomVoipMessage({
  message,
  ...props
}: ChatroomVoipMessageProps) {
  return (
    <div className="" {...props}>
      group call: {message.message_entity.msgContent}
    </div>
  );
}
