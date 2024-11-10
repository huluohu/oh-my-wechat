import type { MessageProp } from "@/components/message/message.tsx";
import type { VoipMessage as VoipMessageVM } from "@/lib/schema.ts";

interface VoipMessageProps extends MessageProp<VoipMessageVM> {
  variant: "default" | "referenced";
}

export interface VoipMessageEntity {
  voipmsg?: {
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
  voipinvitemsg?: {
    roomid: 88320233;
    key: "7240177537323914205";
    status: 2;
    invitetype: 1;
  };
  voipextinfo?: {
    recvtime: 1685271014;
  };
}

export default function VoipMessage({ message, ...props }: VoipMessageProps) {
  return (
    <>
      {message.message_entity.voipmsg && (
        <div className="" {...props}>
          call:{" "}
          {message.message_entity.voipmsg["@_type"] === "VoIPBubbleMsg" &&
            message.message_entity.voipmsg[
              message.message_entity.voipmsg["@_type"]
            ].msg}
        </div>
      )}

      {message.message_entity.voipinvitemsg && (
        <div className="" {...props}>
          <p>通话邀请</p>
        </div>
      )}
    </>
  );
}
