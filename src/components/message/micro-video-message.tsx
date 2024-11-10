import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface MicroVideoMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface MicroVideoMessageEntity {
  msg: {
    videomsg: {
      "@_clientmsgid": string;
      "@_playlength": string;
      "@_length": string;
      "@_type": string;
      "@_status": string;
      "@_fromusername": string;
      "@_aeskey": string;
      "@_cdnvideourl": string;
      "@_cdnthumburl": string;
      "@_cdnthumblength": string;
      "@_cdnthumbwidth": string;
      "@_cdnthumbheight": string;
      "@_cdnthumbaeskey": string;
      "@_encryver": string;
      "@_isplaceholder": string;
      "@_rawlength": string;
      "@_cdnrawvideourl": string;
      "@_cdnrawvideoaeskey": string;
    };
  };
}

export default function MicroVideoMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: MicroVideoMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });

  const messageEntity: MicroVideoMessageEntity = xmlParser.parse(
    message.Message,
  );

  return <div className="">micro video: {message.MesLocalID}</div>;
}
