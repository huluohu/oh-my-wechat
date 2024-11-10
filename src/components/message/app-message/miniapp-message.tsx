import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type MiniappMessageEntity = AppMessageEntity<{
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
}>;

interface MiniappMessageProps extends Omit<AppMessageProps, "message"> {
  message: MiniappMessageEntity;
}

export default function MiniappMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: MiniappMessageProps) {
  // debugger;
  return (
    <div>
      <div className={"flex"}>
        <img
          src={message.msg.appmsg.weappinfo.weappiconurl}
          alt=""
          referrerPolicy="no-referrer"
          className={"w-8 h-8 rounded-full"}
        />
        <h4>{message.msg.appmsg.sourcedisplayname}</h4>
      </div>
      <div className={"w-full pb-[60%] bg-neutral-400"} />
      <div>
        <small>
          message.msg.appmsg.weappinfo.type: {message.msg.appmsg.weappinfo.type}
        </small>
      </div>
    </div>
  );
}
