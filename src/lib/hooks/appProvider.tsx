import { createContext, useContext, useState } from "react";

interface AppProviderContext {
  session: string;
  setSession: (session: string) => void;

  enableDebug: boolean;
}

const AppContext = createContext<AppProviderContext>({
  session: undefined,
  setSession: () => {},

  enableDebug: false,
});

interface AppProviderProps extends AppProviderContext {
  children: React.ReactNode;
}

export const AppProvider = ({ children, ...props }: AppProviderProps) => {
  const [session, setSession] = useState<string>(props.session);

  return (
    <AppContext.Provider value={{ ...props, session, setSession }}>
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
