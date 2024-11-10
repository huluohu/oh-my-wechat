import AnnouncementMessage, {
  type AnnouncementMessageEntity,
} from "@/components/message/app-message/announcement-message.tsx";
import Attach2Message, {
  type Attach2MessageEntity,
} from "@/components/message/app-message/attach-2-message.tsx";
import AttachMessage, {
  type AttachMessageEntity,
} from "@/components/message/app-message/attach-message.tsx";
import AudioMessage, {
  type AudioMessageEntity,
} from "@/components/message/app-message/audio-message.tsx";
import ChannelMessage, {
  type ChannelMessageEntity,
} from "@/components/message/app-message/channel-message.tsx";
import ForwardMessage, {
  type ForwardMessageEntity,
} from "@/components/message/app-message/forward-message.tsx";
import LiveMessage, {
  type LiveMessageEntity,
} from "@/components/message/app-message/live-message.tsx";
import MiniappMessage, {
  type MiniappMessageEntity,
} from "@/components/message/app-message/miniapp-message.tsx";
import MiniappUnknownMessage, {
  type MiniappUnknownMessageEntity,
} from "@/components/message/app-message/miniapp-unknown-message.tsx";
import PatMessage, {
  type PatMessageEntity,
} from "@/components/message/app-message/pat-message.tsx";
import RedEnvelopeMessage, {
  type RedEnvelopeMessageEntity,
} from "@/components/message/app-message/red-envelope-message.tsx";
import ReferMessage, {
  type ReferMessageEntity,
} from "@/components/message/app-message/refer-message.tsx";
import StickerMessage, {
  type StickerMessageEntity,
} from "@/components/message/app-message/sticker-message.tsx";
import TextMessage, {
  type AppTextMessageEntity,
} from "@/components/message/app-message/text-message.tsx";
import TransferMessage, {
  type TransferMessageEntity,
} from "@/components/message/app-message/transfer-message.tsx";
import UrlMessage, {
  type UrlMessageEntity,
} from "@/components/message/app-message/url-message.tsx";
import VideoMessage, {
  type VideoMessageEntity,
} from "@/components/message/app-message/video-message.tsx";
import type { MessageProp } from "@/components/message/message.tsx";
import {
  AppMessageType,
  type AppMessage as AppMessageVM,
} from "@/lib/schema.ts";

export interface AppMessageProps<
  T = {
    type: 0;
  },
> extends MessageProp<AppMessageVM<T>> {
  variant: "default" | "referenced";
}

export interface AppMessageEntity<
  T = {
    type: 0;
  },
> {
  msg: {
    appmsg: T;
    appinfo?: {
      appname: string;
    };
  };
}

export default function AppMessage({
  message,
  ...props
}: AppMessageProps<{
  type: unknown;
  [key: string]: unknown;
}>) {
  if (!message.message_entity.msg?.appmsg) {
    // throw new Error("Invalid app message");
    console.error(message);
    return <div className="">无法解析：49</div>;
  }

  switch (message.message_entity.msg.appmsg.type) {
    case AppMessageType.TEXT:
      return (
        <TextMessage
          message={message as unknown as AppMessageVM<AppTextMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.AUDIO:
      return (
        <AudioMessage
          message={message as unknown as AppMessageVM<AudioMessageEntity>}
          {...props}
        />
      );
    case AppMessageType.VIDEO:
      return (
        <VideoMessage
          message={message as unknown as AppMessageVM<VideoMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.ATTACH:
      return (
        <AttachMessage
          message={message as unknown as AppMessageVM<AttachMessageEntity>}
          {...props}
        />
      );
    case AppMessageType.STICKER:
      return (
        <StickerMessage
          message={message as unknown as AppMessageVM<StickerMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.FORWARD_MESSAGE:
      return (
        <ForwardMessage
          message={message as unknown as AppMessageVM<ForwardMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.MINIAPP_UNKNOWN:
      return (
        <MiniappUnknownMessage
          message={
            message as unknown as AppMessageVM<MiniappUnknownMessageEntity>
          }
          {...props}
        />
      );

    case AppMessageType.MINIAPP:
      return (
        <MiniappMessage
          message={message as unknown as AppMessageVM<MiniappMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.CHANNEL:
      return (
        <ChannelMessage
          message={message as unknown as AppMessageVM<ChannelMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.REFER:
      return (
        <ReferMessage
          message={message as unknown as AppMessageVM<ReferMessageEntity>}
          {...props}
        />
      );
    case AppMessageType.PAT:
      return (
        <PatMessage
          message={message as unknown as AppMessageVM<PatMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.LIVE:
      return (
        <LiveMessage
          message={message as unknown as AppMessageVM<LiveMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.ATTACH_2:
      return (
        <Attach2Message
          message={message as unknown as AppMessageVM<Attach2MessageEntity>}
          {...props}
        />
      );

    case AppMessageType.ANNOUNCEMENT:
      return (
        <AnnouncementMessage
          message={
            message as unknown as AppMessageVM<AnnouncementMessageEntity>
          }
          {...props}
        />
      );

    case AppMessageType.TRANSFER:
      return (
        <TransferMessage
          message={message as unknown as AppMessageVM<TransferMessageEntity>}
          {...props}
        />
      );
    case AppMessageType.RED_ENVELOPE:
      return (
        <RedEnvelopeMessage
          message={message as unknown as AppMessageVM<RedEnvelopeMessageEntity>}
          {...props}
        />
      );

    case AppMessageType.URL:
      return (
        <UrlMessage
          message={message as unknown as AppMessageVM<UrlMessageEntity>}
          {...props}
        />
      );

    default:
      return (
        <div className="">
          不支持：49/{message.message_entity.msg.appmsg.type as number}
        </div>
      );
  }
}
