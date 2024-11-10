import type { Chat } from "@/lib/schema.ts";
import { createContext, useContext, useState } from "react";

interface AppProviderContext {
  chat: Chat | undefined;
  setChat: (chat: Chat) => void;

  enableDebug: boolean;
}

const AppContext = createContext<AppProviderContext>({
  chat: undefined,
  setChat: () => {},

  enableDebug: false,
});

interface AppProviderProps {
  enableDebug: boolean;

  children: React.ReactNode;
}

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const [chat, setChat] = useState<Chat>();

  return (
    <AppContext.Provider value={{ ...props, chat: chat, setChat: setChat }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
