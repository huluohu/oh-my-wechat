import { ChatController } from "@/lib/controllers/chat";
import { ContactController } from "@/lib/controllers/contact.ts";
import { ImageController } from "@/lib/controllers/image.ts";
import { MessageController } from "@/lib/controllers/message.ts";
import { useDatabase } from "@/lib/hooks/databaseProvider.tsx";
import { useState } from "react";
import { AttachController } from "../controllers/attach";

enum Controller {
  Chat = "/chats",
  Contacts = "/contacts",
  Messages = "/messages",
  Images = "/images",
  Attach = "/attach",
}

const controller: {
  [key: string]: (...args: any[]) => Promise<any>;
} = {
  [Controller.Chat]: ChatController.all,
  [Controller.Contacts]: ContactController.all,
  [Controller.Messages]: MessageController.all,
  [Controller.Images]: ImageController.get,
  [Controller.Attach]: AttachController.get,
};

export default function useQuery<T>(
  initialState: T,
): [(endpoint: string, ...args: any[]) => void, boolean, T, unknown] {
  const { dictionary, databases } = useDatabase();
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [result, setResult] = useState<T>(initialState);
  const [error, setError] = useState(null);

  const query = async (endpoint: string, ...args: any[]) => {
    setIsQuerying(true);
    let result = null;
    switch (endpoint) {
      case Controller.Chat:
      case Controller.Contacts:
      case Controller.Messages:
        result = await controller[endpoint](databases, ...args);
        break;
      case Controller.Images:
      case Controller.Attach:
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
