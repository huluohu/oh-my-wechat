import type { MessageProp } from "@/components/message/message.tsx";
import { useApp } from "@/lib/hooks/appProvider.tsx";
import useQuery from "@/lib/hooks/useQuery.ts";
import { XMLParser } from "fast-xml-parser";

interface ImageMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface ImageMessageEntity {
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

export default function ImageMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ImageMessageProps) {
  const { session } = useApp();

  const [query, isQuerying, result, error] = useQuery<unknown>({});

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: ImageMessageEntity = xmlParser.parse(message.Message);

  return (
    <div
      className="bg-neutral-400 w-32 h-24 rounded-lg"
      onClick={() => {
        query("/images", {
          session,
          id: message.MesLocalID,
        });
      }}
    >
      image: {message.MesLocalID}
      <img src={result} loading="lazy" />
    </div>
  );
}
