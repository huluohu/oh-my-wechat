import type { MessageProp } from "@/components/message/message.tsx";
import type { MicroVideoMessage as MicroVideoMessageVM } from "@/lib/schema.ts";

interface MicroVideoMessageProps extends MessageProp<MicroVideoMessageVM> {
  variant: "default" | "referenced";
}

export interface MicroVideoMessageEntity {
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
  ...props
}: MicroVideoMessageProps) {
  return (
    <div className="" {...props}>
      micro video: {message.local_id}
    </div>
  );
}
