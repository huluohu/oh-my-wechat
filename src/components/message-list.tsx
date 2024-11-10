import ChatroomMessage from "@/components/message/chatroom-message.tsx";
import Message from "@/components/message/message.tsx";
import useQuery from "@/lib/hooks/useQuery.ts";
import type { Contact, DatabaseMessageRow, DatabaseRow } from "@/lib/schema.ts";
import type React from "react";
import { useEffect } from "react";

interface MessageListProps extends React.HTMLAttributes<HTMLTableElement> {
  wxid: string;
  isChatroom: boolean;
}

export default function MessageList({
  wxid,
  isChatroom,
  className,
  ...props
}: MessageListProps) {
  const [query, isQuerying, result, error] = useQuery<DatabaseMessageRow[]>([]);

  useEffect(() => {
    query("/messages", wxid);
  }, [wxid]);

  // console.log(result);
  // console.log(error);

  return (
    <div className={"space-y-4"}>
      {result.map((message) =>
        isChatroom ? (
          <ChatroomMessage type={message.Type} message={message} />
        ) : (
          <Message
            type={message.Type}
            message={message}
            direction={message.Des}
            isChatroom={isChatroom}
          />
        ),
      )}
    </div>
  );
}
