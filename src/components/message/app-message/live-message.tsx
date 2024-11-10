import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type LiveMessageEntity = AppMessageEntity<{
  type: AppMessageType.LIVE;
  title: string;
  finderLive: {
    finderLiveID: string;
    finderUsername: string;
    finderObjectID: string;
    finderNonceID: string;
    nickname: string;
    headUrl: string;
    liveNickname: string;
    liveUsername: string;
    liveFlag: number;
    media: {
      coverUrl: string;
      height: number;
      width: number;
    };
    chatroomId: string;
  };
}>;

interface LiveMessageProps extends Omit<AppMessageProps, "message"> {
  message: LiveMessageEntity;
}

export default function LiveMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: LiveMessageProps) {
  return (
    <div>
      <p>直播：{message.msg.appmsg.finderLive.liveNickname})</p>
    </div>
  );
}
