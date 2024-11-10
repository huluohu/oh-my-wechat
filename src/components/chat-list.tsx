import { useApp } from "@/lib/hooks/appProvider";
import useQuery from "@/lib/hooks/useQuery.ts";
import type { Chat } from "@/lib/schema.ts";
import { cn } from "@/lib/utils.ts";
import { useEffect } from "react";

interface ChatListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, "onClick"> {
  onClick: (chat: Chat) => void;
}

export default function ChatList({ onClick, ...props }: ChatListProps) {
  const { chat, setChat } = useApp();

  const [query, isQuerying, result, error] = useQuery<Chat[]>([]);

  useEffect(() => {
    query("/chats");
  }, []);

  return (
    <ul>
      {result.map((i) => (
        <li
          key={i.id}
          className={cn(
            "p-2.5 flex gap-4 hover:bg-black/5",
            i.id === chat?.id ? "bg-black/5" : "",
          )}
          onClick={() => {
            console.log(i);
            onClick?.(i);
          }}
        >
          {i.photo ? (
            <div className={"shrink-0 w-12 h-12 rounded-lg overflow-hidden"}>
              <img
                width={48}
                height={48}
                className={"w-full h-full"}
                src={i.photo}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          ) : (
            <div className={"shrink-0 w-12 h-12 rounded-lg bg-neutral-300"} />
          )}

          <div className="flex flex-col">
            <h4 className={"font-medium break-all line-clamp-1"}>{i.title}</h4>
          </div>
        </li>
      ))}
    </ul>
  );
}
