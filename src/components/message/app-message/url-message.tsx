import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";
import { cn, decodeHTMLComponent } from "@/lib/utils.ts";

export interface UrlMessageEntity {
  type: AppMessageType.URL;
  title: string;
  des?: string;
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
  sourcedisplayname?: string;
  commenturl: string;
  thumburl?: string;
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
}

type UrlMessageProps = AppMessageProps<UrlMessageEntity>;

export default function UrlMessage({ message, ...props }: UrlMessageProps) {
  return (
    <div
      title={message.message_entity.msg.appmsg.title}
      className={"relative max-w-[30em] flex flex-col rounded-lg bg-white"}
      {...props}
    >
      <a
        // href={message.message_entity.msg.appmsg.url}
        target="_blank"
        referrerPolicy="no-referrer"
        rel="noreferrer"
      >
        <div className="p-3">
          <h4 className="font-medium line-clamp-3">
            {decodeHTMLComponent(message.message_entity.msg.appmsg.title)}
          </h4>
          <div
            className={cn(
              "mt-1 text-neutral-500",
              message.message_entity.msg.appmsg.thumburl && "min-h-[2lh]",
            )}
          >
            {message.message_entity.msg.appmsg.thumburl && (
              <img
                className={"float-end ms-2 h-[2lh] w-auto rounded"}
                src={message.message_entity.msg.appmsg.thumburl}
                referrerPolicy="no-referrer"
                loading="lazy"
                alt={""}
              />
            )}
            {message.message_entity.msg.appmsg.des && (
              <p className="line-clamp-5">
                {decodeHTMLComponent(message.message_entity.msg.appmsg.des)}
              </p>
            )}
          </div>
        </div>

        {message.message_entity.msg.appmsg.sourcedisplayname && (
          <div className="px-3 py-2.5 text-sm leading-none text-neutral-500 border-t border-neutral-200">
            <small className="[font-size:inherit]">
              {message.message_entity.msg.appmsg.sourcedisplayname}
            </small>
            <div className="float-end my-auto w-4 h-4 bg-neutral-400 rounded-sm" />
          </div>
        )}
      </a>
    </div>
  );
}
