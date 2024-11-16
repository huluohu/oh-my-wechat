import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface ChannelMessageEntity {
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
}

type ChannelMessageProps = AppMessageProps<ChannelMessageEntity>;

export default function ChannelMessage({
  message,

  ...props
}: ChannelMessageProps) {
  return (
    <div className="relative w-48" {...props}>
      <img
        src={
          message.message_entity.msg.appmsg.finderFeed.mediaList.media.thumbUrl
        }
        alt=""
        referrerPolicy="no-referrer"
      />
      <div className="absolute right-0 bottom-0 flex flex-col text-white">
        <h4>{message.message_entity.msg.appmsg.finderFeed.nickname}</h4>
        <p>{message.message_entity.msg.appmsg.finderFeed.desc}</p>
      </div>

      <div className="absolute right-2 bottom-2 w-4 h-4 bg-neutral-500"></div>
    </div>
  );
}
