import { Contact } from "@/lib/controllers/contact.ts";
import { Message } from "@/lib/controllers/message.ts";
import { Session } from "@/lib/controllers/session.ts";
import { useDatabase } from "@/lib/hooks/databaseProvider.tsx";
import { useState } from "react";

const controller: {
  [key: string]: any;
} = {
  "/sessions": Session.all,
  "/contacts": Contact.all,
  "/messages": Message.all,
};

export default function useQuery<T>(initialState: T) {
  const { databases } = useDatabase();
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [result, setResult] = useState<T>(initialState);
  const [error, setError] = useState(null);

  const query = async (endpoint: string, ...args) => {
    setIsQuerying(true);
    const result = await controller[endpoint](databases, ...args);
    setResult(result);
    setError(null);
    setIsQuerying(false);
  };

  return [query, isQuerying, result, error];
}
