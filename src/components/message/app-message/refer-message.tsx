import type { AppMessageProps } from "@/components/message/app-message.tsx";
import TextMessage from "@/components/message/text-message.tsx";
import { type AppMessageType, MessageType } from "@/lib/schema.ts";
import { cn } from "@/lib/utils";

export interface ReferMessageEntity {
  type: AppMessageType.REFER;
  title: string;
  refermsg: {
    type: number;
    svrid: string;
    fromusr: string;
    chatusr: string;
    displayname: string;
    msgsource: string; // xml
    content: string;
  };
}

type ReferMessageProps = AppMessageProps<ReferMessageEntity>;

export default function ReferMessage({
  message,
  direction,
  ...props
}: ReferMessageProps) {
  return (
    <div
      className={cn(
        "py-2.5 px-3 w-fit max-w-[20em] rounded-lg",
        ["bg-[#95EB69]", "bg-white"][direction],
        "leading-normal tracking-[-.022em] text-justify break-words text-pretty",
        "space-y-2",
        // textMessageVariants[variant],
      )}
      {...props}
    >
      <p>{message.message_entity.msg.appmsg.title}</p>

      {message.reply_to_message ? (
        message.reply_to_message.type === MessageType.TEXT ? (
          <TextMessage
            variant={"referenced"}
            message={message.reply_to_message}
            direction={message.reply_to_message.direction}
            showPhoto
            showUsername
          />
        ) : (
          <small className={"bg-neutral-400"}>回复消息</small>
        )
      ) : (
        <small className={"bg-neutral-400"}>回复信息</small>
      )}
    </div>
  );
}
