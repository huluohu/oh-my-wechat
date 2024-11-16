import ChatroomMessage from "@/components/message/chatroom-message.tsx";
import Message from "@/components/message/message.tsx";
import { Button } from "@/components/ui/button.tsx";
import useQuery from "@/lib/hooks/useQuery.ts";
import type {
  Chat,
  ControllerPaginatorResult,
  Message as MessageVM,
} from "@/lib/schema.ts";
import { cn } from "@/lib/utils";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

interface MessageListProps extends React.HTMLAttributes<HTMLTableElement> {
  chat: Chat;
  isChatroom: boolean;
}

export default function MessageList({
  chat,
  isChatroom,
  className,
  ...props
}: MessageListProps) {
  const [messageList, setMessageList] = useState<{
    [key: number]: MessageVM[];
  }>({});
  const [query, isQuerying, result, error] = useQuery<
    ControllerPaginatorResult<MessageVM[]>
  >({
    data: [],
    meta: {},
  });

  const paginatorCursor = useRef<number>();

  useEffect(() => {
    paginatorCursor.current = Date.now();
    setMessageList({});
    query("/messages", {
      chat,
      cursor: paginatorCursor.current,
    });
  }, [chat]);

  useEffect(() => {
    paginatorCursor.current = result.meta.next_cursor;
    if (result.meta.cursor) {
      setMessageList((old) => ({
        // @ts-ignore
        [result.meta.cursor]: result.data,
        ...old,
      }));
    }
  }, [result]);

  // console.log(result);
  // console.log(result);

  return (
    <div className={cn("relative overflow-auto bg-neutral-100", className)}>
      <div className="z-10 sticky top-0 mb-4 w-full h-[4.5rem] px-4 flex items-center bg-white">
        {/* {session} */}
      </div>

      <div
        className={"mx-auto max-w-screen-md px-4 flex flex-col-reverse gap-4"}
      >
        {Object.keys(messageList)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((key) => (
            <React.Fragment key={key}>
              <span className={"bg-red-500"}>{key}</span>
              {messageList[parseInt(key)].map((message) =>
                isChatroom ? (
                  <ChatroomMessage
                    {...props}
                    key={`${message.id}|${message.local_id}`}
                    type={message.type}
                    message={message}
                    direction={message.direction}
                    showPhoto={true}
                    showUsername={true}
                  />
                ) : (
                  <Message
                    {...props}
                    key={`${message.id}|${message.local_id}`}
                    type={message.type}
                    message={message}
                    direction={message.direction}
                    showPhoto={false}
                    showUsername={false}
                  />
                ),
              )}
            </React.Fragment>
          ))}

        <Button
          onClick={() => {
            query("/messages", {
              chat,
              cursor: paginatorCursor.current,
            });
          }}
        >
          more
        </Button>
      </div>
    </div>
  );
}
