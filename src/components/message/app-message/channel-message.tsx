import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type ChannelMessageEntity = AppMessageEntity<{
  type: AppMessageType.CHANNEL;
  title: string;
  finderFeed: {
    objectId: string;
    feedType: number;
    nickname: string;
    avatar: string;
    desc: string;
    mediaCount: number;
    objectNonceId: string;
    liveId: number;
    username: string;
    authIconUrl: string;
    authIconType: number;
    mediaList: {
      media: {
        thumbUrl: string;
        fullCoverUrl: string;
        videoPlayDuration: number;
        url: string;
        coverUrl: string;
        height: number;
        mediaType: number;
        fullClipInset: string;
        width: number;
      };
    };
    megaVideo: {
      objectId: string;
      objectNonceId: string;
    };
    bizUsername: string;
    bizNickname: string;
    bizAvatar: string;
    bizUsernameV2: string;
    bizAuthIconUrl: string;
    bizAuthIconType: number;
  };
}>;

interface ChannelMessageProps extends Omit<AppMessageProps, "message"> {
  message: ChannelMessageEntity;
}

export default function ChannelMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ChannelMessageProps) {
  return (
    <div>
      <p>频道: {message.msg.appmsg.finderFeed.nickname}: </p>
    </div>
  );
}
