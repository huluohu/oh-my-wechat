import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type PatMessageEntity = AppMessageEntity<{
  type: AppMessageType.PAT;
  title: string;
  patMsg: {
    records: {
      record: {
        svrId: string;
        pattedUser: string;
        templete: string;
        fromUser: string;
        createTime: number;
      };
      recordNum: number;
    };
    chatUser: string;
  };
}>;

interface PatMessageProps extends Omit<AppMessageProps, "message"> {
  message: PatMessageEntity;
}

export default function PatMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: PatMessageProps) {
  return (
    <div>
      <p>{message.msg.appmsg.patMsg.records.record.templete}</p>
    </div>
  );
}
