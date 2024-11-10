import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface VoiceMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface VoiceMessageEntity {
  msg: {
    voicemsg: {
      "@_endflag": "0" | "1";
      "@_cancelflag": "0" | "1";
      "@_forwardflag": "0" | "1";
      "@_voiceformat": string;
      "@_voicelength": string;
      "@_length": string;
      "@_bufid": string;
      "@_aeskey": string;
      "@_voiceurl": string;
      "@_voicemd5": string;
      "@_clientmsgid": string;
      "@_fromusername": string;
    };
  };
}

export default function VoiceMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: VoiceMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: VoiceMessageEntity = xmlParser.parse(message.Message);
  return (
    <div className="">voice: {messageEntity.msg.voicemsg["@_voicelength"]}</div>
  );
}
