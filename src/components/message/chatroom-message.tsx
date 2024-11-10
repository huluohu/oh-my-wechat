import Message from "@/components/message/message.tsx";
import type { MessageType } from "@/lib/schema.ts";

interface ChatroomMessageProp {
  type: MessageType;
  message: `${string}:\n${string}`;
}

export default function ChatroomMessage({
  type,
  message,
}: ChatroomMessageProp) {
  let sender, messageContent;
  if (message.startsWith("<")) {
    messageContent = message;
  } else {
    [sender, messageContent] = message.split(":\n", 2);
  }
  return (
    <>
      {/*{type}*/}
      {sender}
      <Message type={type} message={messageContent} direction={0} />
    </>
  );
}
