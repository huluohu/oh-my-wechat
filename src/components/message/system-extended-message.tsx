import type { MessageProp } from "@/components/message/message.tsx";
import type { SystemExtendedMessage as SystemExtendedMessageVM } from "@/lib/schema.ts";

type SystemExtendedMessageProps = MessageProp<SystemExtendedMessageVM>;

export interface SystemExtendedMessageEntity {
  sysmsg:
    | {
        "@_type": "editrevokecontent";
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
      }
    | {
        "@_type": "sysmsgtemplate";
        sysmsgtemplate: {
          content_template: {
            plain: "";
            template: "$username$ invited $names$ to the group chat";
            link_list: {
              link: [
                {
                  memberlist: {
                    member: {
                      username: "bob_fu";
                      nickname: "傅丰元@灵买会";
                    };
                  };
                  "@_name": "username";
                  "@_type": "link_profile";
                },
                {
                  memberlist: {
                    member: {
                      username: "wxid_dfrzcc5zfugi22";
                      nickname: "曹中";
                    };
                  };
                  separator: ", ";
                  "@_name": "names";
                  "@_type": "link_profile";
                },
              ];
            };
            "@_type": "tmpl_type_profile";
          };
        };
      };
}

export default function SystemExtendedMessage({
  message,
  ...props
}: SystemExtendedMessageProps) {
  return (
    <div className="" {...props}>
      {message.message_entity.sysmsg["@_type"]}:
      {message.message_entity.sysmsg["@_type"] === "editrevokecontent" &&
        message.message_entity.sysmsg["editrevokecontent"].text}
      {message.message_entity.sysmsg["@_type"] === "sysmsgtemplate" &&
        message.message_entity.sysmsg["sysmsgtemplate"].content_template
          .template}
    </div>
  );
}
