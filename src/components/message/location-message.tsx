import type { MessageProp } from "@/components/message/message.tsx";
import { XMLParser } from "fast-xml-parser";

interface LocationMessageProps extends MessageProp {
  variant: "default" | "referenced";
}

interface LocationMessageEntity {
  msg: {
    location: {
      "@_x": string; // 纬度
      "@_y": string; // 经度
      "@_scale": string; // ？缩放级别
      "@_label": string;
      "@_maptype": string;
      "@_poiname": string;
      "@_poiid": string;
      "@_buildingId": string;
      "@_floorName": string;
      "@_poiCategoryTips": string;
      "@_poiBusinessHour": string;
      "@_poiPhone": string;
      "@_poiPriceTips": string;
      "@_isFromPoiList": "true" | "false";
      "@_adcode": string;
      "@_cityname": string;
    };
  };
}

export default function LocationMessage({
  message,
  variant = "default",
  direction,
  isChatroom,
}: LocationMessageProps) {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
  });
  const messageEntity: LocationMessageEntity = xmlParser.parse(message.Message);

  return (
    <div className="">
      location: {messageEntity.msg.location["@_poiname"]},{" "}
      {messageEntity.msg.location["@_label"]}
    </div>
  );
}
