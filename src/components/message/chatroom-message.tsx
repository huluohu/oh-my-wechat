import Message, { type MessageProp } from "@/components/message/message.tsx";

export default function ChatroomMessage({
  message,
  direction,
  ...props
}: MessageProp) {
  return (
    <>
      <Message
        message={message}
        direction={direction}
        {...props}
        showPhoto
        showUsername
      />
    </>
  );
}
