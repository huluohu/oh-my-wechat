import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface SystemExtendedMessageProps extends MessageProp {}

interface SystemExtendedMessageEntity {
  sysmsg: {
    "@_type": "editrevokecontent" | string;
    editrevokecontent: {
      text: string; // eg. "You recalled a message"
      link: {
        scene: string; // eg. "editrevokecontent"
        text: string; // eg. "Edit"
        revokecontent: string;
        referid: string;
        atuserlist: string;
        createTime: string;
      };
    };
  };
}

export default function SystemExtendedMessage({
  message,
}: SystemExtendedMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: SystemExtendedMessageEntity = xmlParser.parse(
    message.Message,
  );
  return (
    <div className="">
      {messageEntity.sysmsg["@_type"]}:
      {messageEntity.sysmsg["@_type"] === "editrevokecontent" &&
        messageEntity.sysmsg["editrevokecontent"].text}
    </div>
  );
}
