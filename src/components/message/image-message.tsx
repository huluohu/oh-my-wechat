import type { MessageProp } from "@/components/message/message.tsx";
import { useApp } from "@/lib/hooks/appProvider.tsx";
import useQuery from "@/lib/hooks/useQuery.ts";
import type {
  ImageMessage as ImageMessageVM,
  PhotpSize,
} from "@/lib/schema.ts";
import { useEffect } from "react";

interface ImageMessageProps extends MessageProp<ImageMessageVM> {
  variant: "default" | "referenced";
}

export interface ImageMessageEntity {
  msg: {
    img: {
      "@_hdlength": string;
      "@_length": string;
      "@_aeskey": string;
      "@_encryver": "0" | "1";
      "@_md5": string;
      "@_filekey": `${string}_${string}_${string}`;
      "@_uploadcontinuecount": string;
      "@_imgsourceurl": string;
      "@_hevc_mid_size": string;

      "@_cdnbigimgurl": "";

      "@_cdnmidimgurl": string;
      "@_cdnmidheight": string;
      "@_cdnmidwidth": string;

      "@_cdnhdheight": string;
      "@_cdnhdwidth": string;

      "@_cdnthumburl": string;
      "@_cdnthumblength": string;
      "@_cdnthumbwidth": string;
      "@_cdnthumbheight": string;
      "@_cdnthumbaeskey": string;
    };
    appinfo: {
      appid: "";
      appname: "";
      version: 0;
      isforceupdate: 1;
      mediatagname: "";
      messageext: "";
      messageaction: "";
    };
    MMAsset: {
      m_assetUrlForSystem: string;
      m_isNeedOriginImage: 0 | 1;
      m_isFailedFromIcloud: 0 | 1;
      m_isLoadingFromIcloud: 0 | 1;
    };
  };
}

export default function ImageMessage({ message, ...props }: ImageMessageProps) {
  const { chat } = useApp();

  const [query, isQuerying, result, error] = useQuery<PhotpSize[]>([]);

  useEffect(() => {
    if (chat)
      query("/images", {
        sessionId: chat.id,
        messageLocalId: message.local_id,
        messageEntity: message.message_entity,
      });
  }, []);

  return (
    <div className="max-w-prose rounded-lg overflow-hidden" {...props}>
      {result.length ? (
        <img
          src={result[0].src}
          loading="lazy"
          alt={""}
          className="max-h-[80vh]"
        />
      ) : null}
    </div>
  );
}
