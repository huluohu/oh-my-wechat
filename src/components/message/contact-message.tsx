import type { MessageProp } from "@/components/message/message.tsx";
import type { ContactMessage as ContactMessageVM } from "@/lib/schema.ts";

interface ContactMessageProps extends MessageProp<ContactMessageVM> {
  variant: "default" | "referenced";
}

export interface ContactMessageEntity {
  msg: {
    "@_certflag": string; // 个人名片应该是 "0"
    "@_certinfo": string; // 企业认证信息

    "@_brandIconUrl": string;
    "@_brandHomeUrl": string; // JSON 公众号相关配置
    "@_brandSubscriptConfigUrl": string; // JSON 公众号相关配置
    "@_brandFlags": "0" | "1";

    "@_regionCode": string;

    "@_biznamecardinfo": string; // unknown

    "@_bigheadimgurl": string;
    "@_smallheadimgurl": string;
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
  ...props
}: ContactMessageProps) {
  if (message.message_entity.msg["@_brandSubscriptConfigUrl"].length) {
    const brandSubscriptConfigUrl = JSON.parse(
      message.message_entity.msg["@_brandSubscriptConfigUrl"],
    );
    console.log(brandSubscriptConfigUrl);
  }
  return message.message_entity.msg["@_certflag"] === "0" ? (
    <div
      className="w-48 flex flex-col bg-white rounded-xl overflow-hidden"
      {...props}
    >
      {message.message_entity.msg["@_bigheadimgurl"] ? (
        <img
          src={message.message_entity.msg["@_bigheadimgurl"]}
          alt=""
          referrerPolicy="no-referrer"
          className={"shrink-0 w-full rounded-lg"}
        />
      ) : (
        <div
          className={"shrink-0 w-full pb-[100%] rounded-lg bg-neutral-300"}
        />
      )}

      <h4 className="p-2.5 font-medium">
        {message.message_entity.msg["@_nickname"]}
      </h4>
    </div>
  ) : (
    <div
      className="max-w-80 flex items-center p-2.5 pr-3 rounded-lg bg-white"
      {...props}
    >
      <img
        src={message.message_entity.msg["@_bigheadimgurl"]}
        alt=""
        referrerPolicy="no-referrer"
        className={"shrink-0 w-16 h-16 rounded-lg"}
      />
      <div className="ml-4 flex flex-col space-y-1.5">
        <h4 className="font-medium">
          {message.message_entity.msg["@_nickname"]}
        </h4>
        <small>{message.message_entity.msg["@_certinfo"]}</small>
      </div>
    </div>
  );
}
