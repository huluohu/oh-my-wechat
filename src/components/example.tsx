import TextMessage from "@/components/message/text-message.tsx";
import {
  Chat,
  DatabaseMessageRow,
  type Message,
  MessageDirection,
  MessageType,
  type PrivateChat,
  type TextMessage as TextMessageVM,
  type User,
} from "@/lib/schema.ts";

const exampleUser: User = {
  id: "wxid_0",
  user_id: "realchclt",
  bio: "bio",
  username: "Chclt",
  remark: "Chclt",
};

const exampleChat: PrivateChat = {
  id: "wxid_0",
  title: "Chclt",
  is_pinned: false,
  is_collapsed: false,
  members: [exampleUser],

  type: "private",
  user: exampleUser,
};

const exampleMessages = [
  {
    id: "0",
    local_id: "0",
    type: MessageType.TEXT,
    from: exampleUser,
    date: 1704038400000,
    direction: MessageDirection.incoming,
    chat: exampleChat,
    message_entity: "Text Message[Shy]",
    raw_message: "Text Message[Shy]",
  } as TextMessageVM,
];

export default function Example() {
  return (
    <div>
      <TextMessage
        variant={"default"}
        message={exampleMessages[0]}
        direction={MessageDirection.incoming}
        showPhoto={false}
        showUsername={false}
      />
    </div>
  );
}
