import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type AttachMessageEntity = AppMessageEntity<{
  type: AppMessageType.ATTACH;
  title: string;
  des: string;
  appattach: {
    totallen: number;
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
}>;

interface AttachMessageProps extends Omit<AppMessageProps, "message"> {
  message: AttachMessageEntity;
}

export default function AttachMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: AttachMessageProps) {
  return (
    <div className={"flex"}>
      <div>
        <p>文件: {message.msg.appmsg.title}</p>
        <small>
          {(
            Math.round(
              (message.msg.appmsg.appattach.totallen / 1024 / 1024) * 100,
            ) / 100
          ).toFixed(2)}
          MB
        </small>
      </div>
      <div className={"shrink-0 w-12 h-12 bg-neutral-400"} />
    </div>
  );
}
