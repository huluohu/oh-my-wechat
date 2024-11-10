import { createContext, useContext } from "react";

interface AppProviderContext {
  enableDebug: boolean;
}

const AppContext = createContext<AppProviderContext>({
  enableDebug: false,
});

interface AppProviderProps extends AppProviderContext {
  children: React.ReactNode;
}

export const AppProvider = ({ enableDebug, children }: AppProviderProps) => {
  return (
    <AppContext.Provider value={{ enableDebug }}>
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
