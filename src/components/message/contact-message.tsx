import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface ContactMessageProps extends MessageProp {
  variant: "default" | "referenced";
}
interface ImageMessageEntity {
  msg: {
    "@_certflag": string;
    "@_certinfo": string; // 企业认证信息

    "@_brandIconUrl": string;
    "@_brandHomeUrl": string; // JSON 公众号相关配置
    "@_brandSubscriptConfigUrl": string; // JSON 公众号相关配置
    "@_brandFlags": "0" | "1";

    "@_regionCode": string;

    "@_biznamecardinfo": string; // unknown

    "@_username": string;
    "@_nickname": string;
    "@_fullpy": string;
    "@_shortpy": string;
    "@_alias": string;
    "@_imagestatus": string; // unknown
    "@_scene": string;
    "@_province": string;
    "@_city": string;
    "@_sign": string; // 个性签名
    "@_sex": "0" | "1"; // TODO
  };
}

export default function ContactMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ContactMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });

  const messageEntity: ImageMessageEntity = xmlParser.parse(message.Message);

  return (
    <div className="border">
      <div className={"flex"}>
        {messageEntity.msg["@_brandIconUrl"] ? (
          <img
            src={messageEntity.msg["@_brandIconUrl"]}
            alt=""
            referrerPolicy="no-referrer"
            className={"shrink-0 w-8 h-8 rounded-full bg-neutral-400"}
          />
        ) : (
          <div className={"shrink-0 w-8 h-8 rounded-full bg-neutral-400"} />
        )}
        <h4>{messageEntity.msg["@_nickname"]}</h4>
      </div>
      <div>
        <small>公众号或者个人名片</small>
      </div>
    </div>
  );
}
