import type { MessageProp } from "@/components/message/message.tsx";
import type { VideoMessage as VideoMessageVM } from "@/lib/schema.ts";

interface VideoMessageProps extends MessageProp<VideoMessageVM> {
  variant: "default" | "referenced";
}

export interface VideoMessageEntity {
  msg: {
    videomsg: {
      "@_length": string;
      "@_playlength": string;
      "@_offset": string;
      "@_rawoffset": string;
      "@_fromusername": string;
      "@_status": string;
      "@_cameratype": string;
      "@_source": string;
      "@_aeskey": string;

      "@_cdnvideourl": string;

      "@_cdnthumburl": string;
      "@_cdnthumblength": string;
      "@_cdnthumbwidth": string;
      "@_cdnthumbheight": string;
      "@_cdnthumbaeskey": string;

      "@_encryver": string;
      "@_fileparam": string;
      "@_md5": string;
      "@_newmd5": string;
      "@_filekey": `${string}_${string}_${string}`;
      "@_uploadcontinuecount": string;

      "@_rawlength": string;
      "@_rawmd5": string;
      "@_cdnrawvideourl": string;
      "@_cdnrawvideoaeskey": string;

      "@_overwritemsgcreatetime": string;
      "@_overwritenewmsgid": string;

      "@_videouploadtoken": string;
      "@_isplaceholder": string;
      "@_rawuploadcontinuecount": string;
    };
  };
}

export default function VideoMessage({ message, ...props }: VideoMessageProps) {
  return (
    <div className="" {...props}>
      video:{message.local_id}
    </div>
  );
}
