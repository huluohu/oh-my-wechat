import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type MiniappUnknownEntity = AppMessageEntity<{
  type: AppMessageType.MINIAPP_UNKNOWN;
  title: string;
  des: string;
  url: string;
  appattach: {
    attachid: string;
    cdnthumburl: string;
    cdnthumbmd5: string;
    cdnthumblength: number;
    cdnthumbheight: number;
    cdnthumbwidth: number;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: number;
    fileext: string;
    islargefilemsg: number;
  };
  sourceusername: string;
  sourcedisplayname: string;
  md5: string;
  weappinfo: {
    pagepath: string;
    username: string;
    appid: string;
    version: number;
    type: number;
    weappiconurl: string;
    shareId: string;
    appservicetype: number;
    secflagforsinglepagemode: number;
    videopageinfo: {
      thumbwidth: number;
      thumbheight: number;
      fromopensdk: number;
    };
  };
}>;

interface MiniappUnknownProps extends Omit<AppMessageProps, "message"> {
  message: MiniappUnknownEntity;
}

export default function MiniappUnknown({
  message,
  variant = "default",
  direction,
  isChatroom,
}: MiniappUnknownProps) {
  return (
    <div>
      小程序：
      <p>{message.msg.appmsg.des}</p>
    </div>
  );
}
