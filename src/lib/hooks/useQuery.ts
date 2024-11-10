import { Contact } from "@/lib/controllers/contact.ts";
import { Image } from "@/lib/controllers/image.ts";
import { Message } from "@/lib/controllers/message.ts";
import { Session } from "@/lib/controllers/session.ts";
import { useDatabase } from "@/lib/hooks/databaseProvider.tsx";
import { data } from "autoprefixer";
import { useState } from "react";

enum Controller {
  Sessions = "/sessions",
  Contacts = "/contacts",
  Messages = "/messages",
  Images = "/images",
}

const controller: {
  [key: string]: any;
} = {
  [Controller.Sessions]: Session.all,
  [Controller.Contacts]: Contact.all,
  [Controller.Messages]: Message.all,
  [Controller.Images]: Image.get,
};

export default function useQuery<T>(initialState: T) {
  const { dictionary, databases } = useDatabase();
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [result, setResult] = useState<T>(initialState);
  const [error, setError] = useState(null);

  const query = async (endpoint: string, ...args) => {
    setIsQuerying(true);
    let result = null;
    switch (endpoint) {
      case Controller.Sessions:
      case Controller.Contacts:
      case Controller.Messages:
        result = await controller[endpoint](databases, ...args);
        break;
      case Controller.Images:
        result = await controller[endpoint](dictionary, databases, ...args);
        break;
      default:
        break;
    }
    setResult(result);
    setError(null);
    setIsQuerying(false);
  };

  return [query, isQuerying, result, error];
}
