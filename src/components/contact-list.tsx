import useQuery from "@/lib/hooks/useQuery.ts";
import type { User } from "@/lib/schema.ts";
import type React from "react";
import { useEffect } from "react";

interface ContactListProps
  extends Omit<React.HTMLAttributes<HTMLTableElement>, "onClick"> {
  onClick: (wxid: string) => void;
}

export default function ContactList({
  onClick,
  className,
  ...props
}: ContactListProps) {
  const [query, isQuerying, result, error] = useQuery<User[]>([]);

  useEffect(() => {
    query("/contacts");
  }, []);

  console.log(result);
  // console.log(error);

  return (
    <table className={className} {...props}>
      <thead className={"sticky top-0"}>
        <tr>
          <th>headphoto</th>
          <th>wxid</th>
          <th>id</th>
          <th>nickname</th>
          {/* <th>remark</th> */}
          {/* <th>type</th>
          <th>field7</th>
          <th>field8</th> */}
        </tr>
      </thead>
      {result.map((contact) => (
        <tr
          key={contact.id}
          onClick={() => {
            console.log(contact);

            // onClickUser(contact.wxid);
          }}
        >
          <td>
            <img
              src={contact?.photo?.thumb}
              referrerPolicy="no-referrer"
              loading="lazy"
              className={"w-8 h-8"}
            />
          </td>
          <td>{contact.username}</td>
          <td>{contact.user_id}</td>
          <td>{contact.remark}</td>

          {/* <td>{contact.remark}</td>
          <td>{contact.type.toString(2)}</td>
          <td>{contact.field7}</td>
          <td>{contact.field8}</td> */}
        </tr>
      ))}
    </table>
  );
}
