import Image from "@/components/image.tsx";
import type { MessageProp } from "@/components/message/message.tsx";
import WechatEmoji, { WechatEmojiTable } from "@/components/wechat-emoji.tsx";
import type { TextMessage as TextMessageVM } from "@/lib/schema.ts";
import { cn } from "@/lib/utils.ts";
import React from "react";

interface TextMessageProps extends MessageProp<TextMessageVM> {
  variant: "default" | "referenced";
}

export type TextMessageEntity = string;

const textMessageVariants = {
  default: "",
  referenced: "text-sm",
};

export default function TextMessage({
  message,
  variant = "default",
  direction,
  showUsername,

  ...props
}: TextMessageProps) {
  if (variant === "default") {
    const urlRegex = /((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)/is;

    const paragraphs = message.message_entity.split("\n").map((p) =>
      p
        .split(/[\[\]]/)
        .filter((s) => s.length)
        .map((s, index) =>
          WechatEmojiTable["[" + s + "]"] ? (
            <WechatEmoji emojiName={"[" + s + "]"} />
          ) : (
            <React.Fragment key={index}>
              {s.split(urlRegex).map((t) => {
                if (urlRegex.test(t)) {
                  return (
                    <a
                      href={t}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noreferrer"
                    >
                      t
                    </a>
                  );
                }

                return <>{t}</>;
              })}
            </React.Fragment>
          ),
        ),
    );

    return (
      <div
        className={cn(
          "py-2.5 px-3 w-fit max-w-[20em] rounded-lg",
          ["bg-[#95EB69]", "bg-white"][direction],
          "leading-normal tracking-[-.022em] break-words text-pretty",
          textMessageVariants[variant],
        )}
        {...props}
      >
        {showUsername && message.from && (
          <div className={"mb-[0.25em] text-sm text-neutral-400"}>
            <small className={"[font-size:inherit]"}>
              {message.from.remark ?? message.from.username}
            </small>
          </div>
        )}
        <div className="space-y-[1lh]">
          {paragraphs.map((p, index) => (
            <p key={`${index}`} className={""}>
              {p.map((s) => s)}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "referenced") {
    return (
      <div
        className={cn(
          "pl-2 pr-2.5 py-1 text-[13px] text-neutral-600 border-l-2 rounded",
          [
            "bg-white/25 border-white/55",
            "bg-[rgba(222,222,222,0.3)] border-[rgba(193,193,193,0.6)]",
          ][direction],
        )}
      >
        <p className={"align-middle"}>
          {message.from?.photo?.thumb && (
            <img
              src={message.from.photo.thumb}
              alt=""
              referrerPolicy="no-referrer"
              className={"inline mr-1 w-4 h-4 rounded-sm"}
            />
          )}
          <span className={"align-middle"}>
            {message.from?.remark ?? message.from?.username ?? ""}:{/* TODO */}
            {message.message_entity as string}
          </span>
        </p>
      </div>
    );
  }
}
