import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";

export interface TransferMessageEntity {
  type: AppMessageType.TRANSFER;
  title: string;
  des: string;

  wcpayinfo: {
    paysubtype: number; // 3: 发 8: 收
    feedesc: string; // eg. "¥23.00"
    transcationid: number;
    transferid: number;
    invalidtime: number;
    effectivedate: number;
    begintransfertime: number;
    templateid: number;
    url: string;
    nativeurl: string;
    iconurl: string;
    locallogoicon: string;
    localbubbleicon: string;
    receivertitle: string;
    sendertitle: string;
    hinttext: string;
    scenetext: string;
    sceneid: number;
    exclusive_recv_username: string;
    receiver_username: string;
    payer_username: string;
    bubble_click_flag: number;
    redenvelopetype: number;
    redenvelopereceiveamount: number;
    detailshowsourcemd5: string;
    recshowsourcemd5: string;
    receiverc2cshowsourcemd5: string;
    senderc2cshowsourcemd5: string;
    senderc2cshowsourceurl: string;
    receiverc2cshowsourceurl: string;
    recshowsourceurl: string;
    detailshowsourceurl: string;
    subtype: number;
    corpname: string;
    expressionurl: string;
    expressiontype: number;
    senderdes: string;
    receiverdes: string;
    total_fee: string;
    fee_type: string;
    innertype: number;
    bubbletype: number;
    receivestatus: number;
    paymsgid: string;
    pay_memo: string;
    has_transfer_address: number;
    imageid: string;
    imageaeskey: string;
    imagelength: number;
    newaa: {
      billno: string;
      newaatype: number;
      launchertitle: string;
      receivertitle: string;
      receiverlist: string;
      payertitle: string;
      payerlist: string;
      notinertitle: string;
      launcherusername: string;
    };
  };
}

type TransferMessageProps = AppMessageProps<TransferMessageEntity>;

export default function TransferMessage({
  message,
  ...props
}: TransferMessageProps) {
  return (
    <div {...props}>
      <p>
        {message.message_entity.msg.appmsg.wcpayinfo.paysubtype === 3 && "收"}
        {message.message_entity.msg.appmsg.wcpayinfo.paysubtype === 8 && "发"}
        {message.message_entity.msg.appmsg.title}:{" "}
        {message.message_entity.msg.appmsg.des}
      </p>
    </div>
  );
}
