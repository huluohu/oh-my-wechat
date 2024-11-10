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

  console.log(result);
  return (
    <>
      <table>
        <thead className={"sticky top-0"}>
          <tr>
            <th>wxid</th>
            <th>lase</th>
          </tr>
        </thead>
        {result.map((contact) => (
          <tr
            key={contact.rowid}
            onClick={() => {
              console.log(contact);
              onClickUser?.(contact.wxid);
            }}
          >
            <td>{contact.wxid}</td>
            <td>
              {(contact.remark?.length ?? 0)
                ? contact.remark
                : contact.nickname}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
