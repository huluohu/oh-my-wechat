import AnnouncementMessage from "@/components/message/app-message/announcement-message.tsx";
import Attach2Message from "@/components/message/app-message/attach-2-message.tsx";
import AttachMessage from "@/components/message/app-message/attach-message.tsx";
import AudioMessage from "@/components/message/app-message/audio-message.tsx";
import ChannelMessage from "@/components/message/app-message/channel-message.tsx";
import ForwardMessage from "@/components/message/app-message/forward-message.tsx";
import LiveMessage from "@/components/message/app-message/live-message.tsx";
import MiniappMessage from "@/components/message/app-message/miniapp-message.tsx";
import MiniappUnknownMessage from "@/components/message/app-message/miniapp-unknown-message.tsx";
import PatMessage from "@/components/message/app-message/pat-message.tsx";
import RedEnvelopeMessage from "@/components/message/app-message/red-envelope-message.tsx";
import ReferMessage from "@/components/message/app-message/refer-message.tsx";
import StickerMessage from "@/components/message/app-message/sticker-message.tsx";
import TextMessage from "@/components/message/app-message/text-message.tsx";
import TransferMessage from "@/components/message/app-message/transfer-message.tsx";
import UrlMessage from "@/components/message/app-message/url-message.tsx";
import VideoMessage from "@/components/message/app-message/video-message.tsx";
import type { MessageProp } from "@/components/message/message.tsx";
import { useApp } from "@/lib/hooks/appProvider.tsx";
import { AppMessageType, type DatabaseMessageRow } from "@/lib/schema.ts";
import { XMLParser } from "fast-xml-parser";

export interface AppMessageProps extends Omit<MessageProp, "message"> {
  message: DatabaseMessageRow;
  variant: "default" | "referenced";
}

export interface AppMessageEntity<
  T = {
    type: AppMessageType;
  },
> {
  msg: {
    appmsg: T;
    appinfo: {
      appname: string;
    };
  };
}

export default function AppMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: AppMessageProps) {
  const { enableDebug } = useApp();

  if (enableDebug) {
    console.info(message);
  }

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });

  const messageEntity: AppMessageEntity = xmlParser.parse(message.Message);

  if (!messageEntity.msg?.appmsg) {
    // throw new Error("Invalid app message");
    console.error(message);
    return <div className="">无法解析：49</div>;
  }

  switch (messageEntity.msg.appmsg.type) {
    case AppMessageType.TEXT:
      return (
        <TextMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.AUDIO:
      return (
        <AudioMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );
    case AppMessageType.VIDEO:
      return (
        <VideoMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.ATTACH:
      return (
        <AttachMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );
    case AppMessageType.STICKER:
      return (
        <StickerMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.FORWARD_MESSAGE:
      return (
        <ForwardMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.MINIAPP_UNKNOWN:
      return (
        <MiniappUnknownMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.MINIAPP:
      return (
        <MiniappMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.CHANNEL:
      return (
        <ChannelMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.REFER:
      return (
        <ReferMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );
    case AppMessageType.PAT:
      return (
        <PatMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.LIVE:
      return (
        <LiveMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.ATTACH_2:
      return (
        <Attach2Message
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.ANNOUNCEMENT:
      return (
        <AnnouncementMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.TRANSFER:
      return (
        <TransferMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );
    case AppMessageType.RED_ENVELOPE:
      return (
        <RedEnvelopeMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    case AppMessageType.URL:
      return (
        <UrlMessage
          message={messageEntity}
          variant={variant}
          direction={direction}
          isChatroom={isChatroom}
        />
      );

    default:
      return <div className="">不支持：49/{messageEntity.msg.appmsg.type}</div>;
  }
}
