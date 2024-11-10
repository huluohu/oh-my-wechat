import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "@/lib/hooks/appProvider.tsx";
import { DatabaseProvider } from "@/lib/hooks/databaseProvider";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AppProvider enableDebug={false}>
        <DatabaseProvider>
          <App />
        </DatabaseProvider>
      </AppProvider>
    </React.StrictMode>,
  );
}
