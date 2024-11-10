import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type UrlMessageEntity = AppMessageEntity<{
  type: AppMessageType.URL;
  title: string;
  des: string;
  username: string;
  action: string;
  content: string;
  url: string;
  lowurl: string;
  forwardflag: number;
  dataurl: string;
  lowdataurl: string;
  contentattr: number;
  streamvideo: {
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
    extinfo: string;
    androidsource: number;
    md5: string;
  };
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
  extinfo: string;
  androidsource: number;
  sourceusername: string;
  sourcedisplayname: string;
  commenturl: string;
  thumburl: string;
  mediatagname: string;
  messageaction: string;
  messageext: string;
  emotionpageshared: {
    webviewshared: {
      shareUrlOriginal: string;
      shareUrlOpen: string;
      jsAppId: string;
      publisherId: string;
    };
    template_id: string;
    md5: string;
    weappinfo: {
      username: string;
      appid: string;
      appservicetype: number;
      secflagforsinglepagemode: number;
      videopageinfo: {
        thumbwidth: number;
        thumbheight: number;
        fromopensdk: number;
      };
    };
  };
}>;

interface UrlMessageProps extends Omit<AppMessageProps, "message"> {
  message: UrlMessageEntity;
}

export default function UrlMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: UrlMessageProps) {
  return (
    <a
      href={message.msg.appmsg.url}
      title={message.msg.appmsg.title}
      className={"border"}
    >
      <h4>{message.msg.appmsg.title}</h4>
    </a>
  );
}
