import type { MessageProp } from "@/components/message/message.tsx";
import type { VoiceMessage as VoiceMessageVM } from "@/lib/schema.ts";

interface VoiceMessageProps extends MessageProp<VoiceMessageVM> {
  variant: "default" | "referenced";
}

export interface VoiceMessageEntity {
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

export default function VoiceMessage({ message, ...props }: VoiceMessageProps) {
  return (
    <div className="" {...props}>
      voice: {message.message_entity.msg.voicemsg["@_voicelength"]}
    </div>
  );
}
