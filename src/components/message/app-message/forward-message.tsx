import type { AppMessageProps } from "@/components/message/app-message.tsx";
import type { AppMessageType } from "@/lib/schema.ts";
import { XMLParser } from "fast-xml-parser";

export interface ForwardMessageEntity {
  type: AppMessageType.FORWARD_MESSAGE;
  title: string;
  des: string;
  recorditem: string;
  appattach: {
    attachid: string;
    cdnthumburl: string;
    cdnthumbmd5: string;
    cdnthumblength: number;
    cdnthumbheight: number;
    cdnthumbwidth: number;
    cdnthumbaeskey: string;
    aeskey: string;
    encryver: number;
    fileext: string;
    islargefilemsg: number;
  };
  md5: string;
}

interface Record {
  recordinfo: {
    title: string;
    desc: string;
    datalist: {
      dataitem: {
        datadesc: string;
        sourcename: string;
        sourcetime: string;
        dataitemsource: {
          realchatname?: string;
          fromusr?: string;
        };
      }[];
    };
    favusername: string;
  };
}

type ForwardMessageProps = AppMessageProps<ForwardMessageEntity>;

export default function ForwardMessage({
  message,
  ...props
}: ForwardMessageProps) {
  const xmlParser = new XMLParser();

  const records: Record = xmlParser.parse(
    message.message_entity.msg.appmsg.recorditem,
  );
  console.log(records);

  return (
    <div {...props}>
      <h4 className="font-medium">{message.message_entity.msg.appmsg.title}</h4>
      {records && (
        <div>
          {records.recordinfo.datalist.dataitem.map((i) => (
            <p>
              {i.sourcename}: {i.datadesc}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
