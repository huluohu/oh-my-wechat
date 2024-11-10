import useQuery from "@/lib/hooks/useQuery.ts";
import type { Contact, DatabaseRow } from "@/lib/schema.ts";
import type React from "react";
import { useEffect } from "react";
import {c} from "vite/dist/node/types.d-aGj9QkWt";

interface ContactListProps extends React.HTMLAttributes<HTMLTableElement> {
  onClickUser: (wxid: string) => void;
}

export default function ContactList({
  onClickUser,
  className,
  ...props
}: ContactListProps) {
  const [query, isQuerying, result, error] = useQuery<DatabaseRow<Contact>[]>(
    [],
  );

  useEffect(() => {
    query("/contacts");
  }, []);

  // console.log(result);
  // console.log(error);

  return (
    <table className={className} {...props}>
      <thead className={"sticky top-0"}>
      <tr>
        <th>wxid</th>
        <th>id</th>
        <th>nickname</th>
        <th>headphoto</th>
        <th>remark</th>
        <th>type</th>
        <th>field7</th>
        <th>field8</th>
      </tr>
      </thead>
      {result.map((contact) => (
          <tr
              key={contact.rowid}
              onClick={() => {
                console.log(contact);

                onClickUser(contact.wxid);
              }}
          >
            <td>{contact.wxid}</td>
            <td>{contact.id}</td>
            <td>{contact.nickname}</td>
            <td>

              <img src={contact.headImageThumb} referrerPolicy="no-referrer" loading="lazy" className={"w-8 h-8"} />
            </td>

            <td>{contact.remark}</td>
            <td>{contact.type.toString(2)}</td>
            <td>{contact.field7}</td>
            <td>{contact.field8}</td>
          </tr>
      ))}
    </table>
  );
}
