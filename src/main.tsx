import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

// Components
import { App } from "./App";

// Contexts
import { AlertContextProvider } from "./contexts/AlertContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </React.StrictMode>
);
