import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface AudioMessageEntity {
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
}

type AudioMessageProps = AppMessageProps<AudioMessageEntity>;

export default function AudioMessage({ message, ...props }: AudioMessageProps) {
  return (
    <div {...props}>
      <p>音频: {message.message_entity.msg.appmsg.title})</p>
    </div>
  );
}
