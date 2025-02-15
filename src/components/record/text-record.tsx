import {
  FormatTextMessageContent,
  textMessageVariants,
} from "@/components/message/text-message.tsx";
import {
  MessageDirection,
  type MessageVM,
  type RecordType,
} from "@/lib/schema.ts";
import { cn } from "@/lib/utils.ts";
import type { RecordVM } from "./record";

interface TextRecordProps extends React.HTMLAttributes<HTMLDivElement> {
  message: MessageVM;
  record: TextRecordEntity;
  variant: "default" | string;
}

export interface TextRecordEntity extends RecordVM {
  "@_datatype": RecordType.TEXT;
  datadesc: string;
}

export default function TextRecord({
  message,
  record,
  variant = "default",
  className,
  ...props
}: TextRecordProps) {
  if (variant === "default")
    return (
      <div
        className={cn(
          textMessageVariants({
            variant: "default",
            direction: MessageDirection.incoming,
            className,
          }),
        )}
        {...props}
      >
        <FormatTextMessageContent text={record.datadesc} />
      </div>
    );

  if (variant === "note")
    return (
      <div className="">
        <FormatTextMessageContent text={record.datadesc} />
      </div>
    );

  return (
    <p className="inline">
      <FormatTextMessageContent text={record.datadesc} className={"inline"} />
    </p>
  );
}
