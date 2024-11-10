import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type AudioMessageEntity = AppMessageEntity<{
  type: AppMessageType.AUDIO;
  title: string;
  des: string;
  username: string;
  action: string;
  url: string;
  lowurl: string;
  dataurl: string;
  lowdataurl: string;
  statextstr: string;
  songalbumurl: string;
  songlyric: string;
  musicShareItem: {
    mvCoverUrl: string;
    musicDuration: number;
    mid: string;
  };
}>;

interface AudioMessageProps extends Omit<AppMessageProps, "message"> {
  message: AudioMessageEntity;
}

export default function AudioMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: AudioMessageProps) {
  return (
    <div>
      <p>音频: {message.msg.appmsg.title})</p>
    </div>
  );
}
