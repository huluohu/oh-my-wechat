import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface AnnouncementMessageEntity {
  type: AppMessageType.ANNOUNCEMENT;
  url: string;
  announcement: string; // xml
  textannouncement: string;
  xmlpuretext: number;
}

type AnnouncementMessageProps = AppMessageProps<AnnouncementMessageEntity>;

export default function AnnouncementMessage({
  message,
  ...props
}: AnnouncementMessageProps) {
  return (
    <div {...props}>
      <p>公告：{message.message_entity.msg.appmsg.textannouncement}</p>
    </div>
  );
}
