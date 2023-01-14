import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

// Components
import { App } from "./App";
import { RecoilRoot } from "recoil";
import { MainContainer } from "./components/MainContainer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MainContainer>
        <App />
      </MainContainer>
    </RecoilRoot>
  </React.StrictMode>
);
