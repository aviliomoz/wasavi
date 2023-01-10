import "../styles/globals.css";
import { RecoilRoot } from "recoil";

// Types
import type { AppProps } from "next/app";

// Components
import { MainContainer } from "../components/app/MainContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </RecoilRoot>
  );
}

export default MyApp;
