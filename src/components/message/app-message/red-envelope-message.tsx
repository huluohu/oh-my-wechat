import type {
  AppMessageEntity,
  AppMessageProps,
} from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

type RedEnvelopeEntity = AppMessageEntity<{
  type: AppMessageType.RED_ENVELOPE;
  title: string;
  des: string;
  url: string;
  thumburl: string;
  wcpayinfo: {
    templateid: string;
    url: string;
    iconurl: string;
    receivertitle: string;
    sendertitle: string;
    scenetext: [string, string];
    senderdes: string;
    receiverdes: string;
    nativeurl: `wxpay://${string}`;
    sceneid: number;
    innertype: number;
    paymsgid: number;
    locallogoicon: "c2c_hongbao_icon_cn" | string;
    invalidtime: number;
    broaden: "";
  };
}>;

interface RedEnvelopeProps extends Omit<AppMessageProps, "message"> {
  message: RedEnvelopeEntity;
}

export default function RedEnvelope({
  message,
  variant = "default",
  direction,
  isChatroom,
}: RedEnvelopeProps) {
  return (
    <div>
      <p>{message.msg.appmsg.des}</p>
    </div>
  );
}
