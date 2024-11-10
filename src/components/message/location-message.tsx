import type { MessageProp } from "@/components/message/message.tsx";
import type { LocationMessage as LocationMessageVM } from "@/lib/schema.ts";

interface LocationMessageProps extends MessageProp<LocationMessageVM> {
  variant: "default" | "referenced";
}

export interface LocationMessageEntity {
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
  ...props
}: LocationMessageProps) {
  return (
    <div className="" {...props}>
      location: {message.message_entity.msg.location["@_poiname"]},{" "}
      {message.message_entity.msg.location["@_label"]}
    </div>
  );
}
