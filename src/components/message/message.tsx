import AppMessage from "@/components/message/app-message.tsx";
import ContactMessage from "@/components/message/contact-message.tsx";
import GroupVoipMessage from "@/components/message/group-voip-message.tsx";
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
  type DatabaseMessageRow,
  type MessageDirection,
  MessageType,
} from "@/lib/schema.ts";
import { cn } from "@/lib/utils.ts";
import { ErrorBoundary } from "react-error-boundary";
import { handler } from "tailwindcss-animate";

export interface MessageProp {
  message: DatabaseMessageRow;
  direction: MessageDirection;
  isChatroom: boolean;
}

export default function Message({
  message,
  direction,
  isChatroom = false,
}: MessageProp) {

  const handleConsoleMessage = (message) => {
    console.log(message);
  }

  return <ErrorBoundary fallback={<div>解析失败的消息</div>}>
    <MessageComponent
      message={message}
      variant={"default"}
      direction={direction}
      isChatroom={isChatroom}
    />
  </ErrorBoundary>

}

function MessageComponent({
  message,
  direction,
  isChatroom = false,
}: MessageProp) {
  switch (message.Type) {
    case MessageType.TEXT:
      return (
        <div
          className={cn(
            "flex gap-x-2",
            ["flex-row-reverse", "flex-row"][direction],
          )}

          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <TextMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <ImageMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <VoiceMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <ContactMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <VideoMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <MicroVideoMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <StickerMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <LocationMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <AppMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <VoipMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
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
          onDoubleClick={() => {
            handleConsoleMessage(message);
          }}
        >
          <div className="shrink-0 w-10 h-10 bg-neutral-400 rounded-lg" />
          <GroupVoipMessage
            message={message}
            variant={"default"}
            direction={direction}
            isChatroom={isChatroom}
          />
        </div>
      );

    case MessageType.SYSTEM:
      return (
        <SystemMessage
          message={message}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case MessageType.SYSTEM_EXTENDED:
      return (
        <SystemExtendedMessage
          message={message}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    default:
      console.error("Unknown message type", message.Type, message);
      return <div>Unknown message type: {message.Type}</div>;
  }
}