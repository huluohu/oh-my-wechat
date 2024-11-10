import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface ViopMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface ViopMessageEntity {
  voipmsg: {
    "@_type": "VoIPBubbleMsg" | string; // eg. VoIPBubbleMsg
    VoIPBubbleMsg: {
      msg: string; // eg. 通话时长 00:31
      room_type: string; // unknown eg. 1
      red_dot: "true" | "false";
      roomid: string;
      roomkey: string;
      inviteid: string;
      msg_type: string; // eg. 0
      timestamp: string;
      identity: string;
      duration: string;
      inviteid64: string;
      business: string;
    };
  };
}

export default function ViopMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: ViopMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: ViopMessageEntity = xmlParser.parse(message.Message);

  return (
    <div className="">
      call:{" "}
      {messageEntity.voipmsg["@_type"] === "VoIPBubbleMsg" &&
        messageEntity.voipmsg[messageEntity.voipmsg["@_type"]].msg}
    </div>
  );
}
