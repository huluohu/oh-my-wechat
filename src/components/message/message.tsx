import AppMessage from "@/components/message/app-message.tsx";
import ChatroomVoipMessage from "@/components/message/chatroom-voip-message.tsx";
import ContactMessage from "@/components/message/contact-message.tsx";
import ImageMessage from "@/components/message/image-message.tsx";
import LocationMessage from "@/components/message/location-message.tsx";
import MicroVideoMessage from "@/components/message/micro-video-message.tsx";
import StickerMessage from "@/components/message/sticker-message.tsx";
import SystemExtendedMessage from "@/components/message/system-extended-message.tsx";
import SystemMessage from "@/components/message/system-message.tsx";
import TextMessage from "@/components/message/text-message.tsx";
import VideoMessage from "@/components/message/video-message.tsx";
import VoiceMessage from "@/components/message/voice-message.tsx";
import VoipMessage from "@/components/message/voip-message.tsx";
import {
  AppMessageType,
  type MessageDirection,
  MessageType,
  type Message as MessageVM,
} from "@/lib/schema.ts";
import { cn } from "@/lib/utils.ts";
import { ErrorBoundary } from "react-error-boundary";

export interface MessageProp<T = MessageVM>
  extends React.HTMLAttributes<HTMLDivElement> {
  message: T;
  direction: MessageDirection;
  showPhoto: boolean;
  showUsername: boolean;
  [key: string]: unknown;
}

export default function Message({ message, direction, ...props }: MessageProp) {
  return (
    <ErrorBoundary
      fallback={
        <div
          onDoubleClick={() => {
            console.log(message);
          }}
        >
          解析失败的消息: {message.raw_message}
        </div>
      }
    >
      <MessageComponent
        onDoubleClick={() => {
          console.log(message);
        }}
        message={message}
        variant={"default"}
        direction={direction}
        {...props}
      />
    </ErrorBoundary>
  );
}

function MessageComponent({
  message,
  direction,
  showPhoto = false,
  ...props
}: MessageProp) {
  switch (message.type) {
    case MessageType.TEXT:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}

          <TextMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.IMAGE:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <ImageMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.VOICE:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <VoiceMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.CONTACT:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <ContactMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.VIDEO:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <VideoMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.MICROVIDEO:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <MicroVideoMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.STICKER:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <StickerMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.LOCATION:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <LocationMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.APP:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto &&
            message.message_entity.msg.appmsg.type !== AppMessageType.PAT && (
              <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
            )}
          <AppMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.VOIP:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <VoipMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.GROUP_VOIP:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}
        >
          {showPhoto && (
            <div className="shrink-0 w-11 h-11 bg-neutral-400 clothoid-corner-0.375" />
          )}
          <ChatroomVoipMessage
            message={message}
            variant={"default"}
            direction={direction}
            showPhoto={showPhoto}
            {...props}
          />
        </div>
      );

    case MessageType.SYSTEM:
      return (
        <SystemMessage
          message={message}
          direction={direction}
          showPhoto={false}
          {...props}
        />
      );

    case MessageType.SYSTEM_EXTENDED:
      return (
        <SystemExtendedMessage
          message={message}
          direction={direction}
          showPhoto={false}
          {...props}
        />
      );

    default:
      return <div>Unknown message type: {(message as MessageVM).type}</div>;
  }
}
