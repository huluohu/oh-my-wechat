import useQuery from "@/lib/hooks/useQuery.ts";
import type { Contact, DatabaseRow } from "@/lib/schema.ts";
import { useEffect } from "react";

interface SessionListProps extends React.HTMLAttributes<HTMLUListElement> {
  onClickUser: (wxid: string) => void;
}

export default function SessionList({
  onClickUser,
  ...props
}: SessionListProps) {
  const [query, isQuerying, result, error] = useQuery<DatabaseRow<Contact>[]>(
    [],
  );

  useEffect(() => {
    query("/sessions");
  }, []);

  return (

    <ul>

      {result.map((contact) => (
        <li
          key={contact.rowid}
          className={"p-2.5 flex gap-4 hover:bg-black/5"}
          onClick={() => {
            console.log(contact);
            onClickUser?.(contact.wxid);
          }}
        >
          {
            contact.headImageThumb ?
              <img
                width={48}
                height={48}
                className={"w-12 h-12 rounded-lg"}
                src={contact.headImageThumb}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              : <div
                className={"w-12 h-12 rounded-lg bg-neutral-300"}

              />
          }

          <div className="flex flex-col">
            <h4 className={"font-medium"}>
              {(contact.remark?.length ?? 0)
                ? contact.remark
                : contact.nickname}
            </h4>

          </div>
        </li>
      ))}
    </ul>
  );
}
