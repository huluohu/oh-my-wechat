import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

import filetype_any from "@/assets/images/filetype_any.svg";
import { decodeHTMLComponent } from "@/lib/utils.ts";

export interface AttachMessageEntity {
  type: AppMessageType.ATTACH;
  title: string;
  des: string;
  appattach: {
    totallen: number | number[];
    fileext: string;
    attachid: string;
    cdnattachurl: string;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: number;
    filekey: `${string}_${string}_${string}`;
    overwrite_newmsgid: string;
    fileuploadtoken: string;
  };
  md5: string;
  recorditem: string;
  uploadpercent: number;
  "@_appid": string;
  "@_sdkver": string;
}

type AttachMessageProps = AppMessageProps<AttachMessageEntity>;

export default function AttachMessage({
  message,
  ...props
}: AttachMessageProps) {
  return (
    <div
      className={
        "max-w-80 py-2.5 pr-2 pl-4 flex items-start bg-white space-x-2.5 rounded-xl"
      }
      {...props}
    >
      <div>
        <h4 className="break-words font-medium">
          {decodeHTMLComponent(message.message_entity.msg.appmsg.title)}
        </h4>
        <small className={"text-neutral-500"}>
          {(
            Math.round(
              ((Array.isArray(
                message.message_entity.msg.appmsg.appattach.totallen,
              )
                ? message.message_entity.msg.appmsg.appattach.totallen[0]
                : message.message_entity.msg.appmsg.appattach.totallen) /
                1024 /
                1024) *
                100,
            ) / 100
          ).toFixed(2)}
          MB
        </small>
      </div>

      <img src={filetype_any} alt={"文件"} />
    </div>
  );
}
