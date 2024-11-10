import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface PatMessageEntity {
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
}

type PatMessageProps = AppMessageProps<PatMessageEntity>;

export default function PatMessage({ message, ...props }: PatMessageProps) {
  return (
    <div {...props}>
      <p>{message.message_entity.msg.appmsg.patMsg.records.record.templete}</p>
    </div>
  );
}
