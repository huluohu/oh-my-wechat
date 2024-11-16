import type { Chat, User } from "@/lib/schema.ts";
import { createContext, useContext, useState } from "react";

interface AppProviderContext {
  user: User | undefined;
  setUser: (user: User) => void;
  chat: Chat | undefined;
  setChat: (chat: Chat) => void;

  enableDebug: boolean;
}

const AppContext = createContext<AppProviderContext>({
  user: undefined,
  setUser: () => { },
  chat: undefined,
  setChat: () => { },

  enableDebug: false,
});

interface AppProviderProps {
  enableDebug: boolean;

  children: React.ReactNode;
}

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const [userList, setUserList] = useState<User[]>()
  const [user, setUser] = useState<User>()
  const [chat, setChat] = useState<Chat>();

  return (
    <AppContext.Provider value={{ ...props, user, setUser, chat, setChat }}>
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
