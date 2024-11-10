import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type AnnouncementMessageEntity = AppMessageEntity<{
  type: AppMessageType.ANNOUNCEMENT;
  url: string;
  announcement: string; // xml
  textannouncement: string;
  xmlpuretext: number;
}>;

interface AnnouncementMessageProps extends Omit<AppMessageProps, "message"> {
  message: AnnouncementMessageEntity;
}

export default function AnnouncementMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: AnnouncementMessageProps) {
  return (
    <div>
      <p>公告：{message.msg.appmsg.textannouncement}</p>
    </div>
  );
}
