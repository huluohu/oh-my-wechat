import type { MessageProp } from "@/components/message/message.tsx";

interface GroupViopMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface GroupViopMessageEntity {
  msgLocalID: number;
  clientGroupID: string;
  groupID: string;
  lastMsgID: number;
  msgContent: string; // eg. "XXX has started a voice call"
}
export default function GroupViopMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: GroupViopMessageProps) {
  const messageEntity: GroupViopMessageEntity = JSON.parse(message.Message);

  return <div className="">group call: {messageEntity.msgContent}</div>;
}
