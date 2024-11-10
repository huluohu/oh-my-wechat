import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface RedEnvelopeMessageEntity {
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
}

type RedEnvelopeProps = AppMessageProps<RedEnvelopeMessageEntity>;

export default function RedEnvelope({ message, ...props }: RedEnvelopeProps) {
  return (
    <div {...props}>
      <p>{message.message_entity.msg.appmsg.des}</p>
    </div>
  );
}
