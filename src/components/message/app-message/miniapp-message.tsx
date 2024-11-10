import type { AppMessageProps } from "@/components/message/app-message.tsx";
import { useApp } from "@/lib/hooks/appProvider";
import useQuery from "@/lib/hooks/useQuery";
import type { AppMessageType, PhotpSize } from "@/lib/schema.ts";
import { cn, decodeHTMLComponent } from "@/lib/utils";
import { useEffect } from "react";

export interface MiniappMessageEntity {
  type: AppMessageType.MINIAPP;
  title: string;
  des: string;
  url: string;
  appattach: {
    cdnthumburl: string;
    cdnthumbmd5: string;
    cdnthumblength: number;
    cdnthumbwidth: number;
    cdnthumbheight: number;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: number;
    filekey: string;
  };
  sourceusername: string;
  sourcedisplayname: string;
  md5: string;
  recorditem: string;
  uploadpercent: number;
  weappinfo: {
    username: string;
    appid: string;
    type: number;
    version: number;
    weappiconurl: string;
    pagepath: string;
    shareId: string;
    pkginfo: {
      type: number;
      md5: string;
    };
    appservicetype: number;
    brandofficialflag: number;
    showRelievedBuyFlag: number;
    subType: number;
    isprivatemessage: number;
  };
  "@_appid": string;
  "@_sdkver": string;
}

type MiniappMessageProps = AppMessageProps<MiniappMessageEntity>;

export default function MiniappMessage({
  message,
  ...props
}: MiniappMessageProps) {
  const { chat } = useApp();

  const [query, isQuerying, result, error] = useQuery<PhotpSize[]>([]);

  useEffect(() => {
    if (chat)
      query("/attach", {
        sessionId: chat.id,
        messageLocalId: message.local_id,
        messageEntity: message.message_entity,
      });
  }, []);

  return (
    <div
      className={cn("relative w-52 bg-white rounded-lg overflow-hidden")}
      {...props}
    >
      <div className="p-2.5 flex flex-col space-y-2.5">
        <div className={"flex items-center gap-2.5 text-sm text-neutral-700"}>
          <img
            src={message.message_entity.msg.appmsg.weappinfo.weappiconurl}
            alt=""
            referrerPolicy="no-referrer"
            className={"w-6 h-6 rounded-full"}
          />
          <h4>{message.message_entity.msg.appmsg.sourcedisplayname}</h4>
        </div>

        <h4 className="leading-normal font-medium">
          {decodeHTMLComponent(message.message_entity.msg.appmsg.title)}
        </h4>
      </div>

      {result.length ? (
        <img src={result[0].src} loading="lazy" alt={""} className="" />
      ) : null}

      <div className="absolute right-2 bottom-2 w-4 h-4 bg-neutral-500" />
    </div>
  );
}
