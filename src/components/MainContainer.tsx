import { redirect } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

// Utils
import { alertState } from "../contexts/alertState";
import { supabase } from "../services/supabase";

// Components
import { AlertBox } from "./ui/AlertBox";
import { useLocalData } from "../hooks/useLocalData";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MainContainer = ({ children }: Props) => {
  const [alert, setAlert] = useRecoilState(alertState);
  const { setLocalData } = useLocalData();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && event == "PASSWORD_RECOVERY") redirect("/reset");
      if (session && event == "SIGNED_IN") {
        setLocalData().then(() => {});
      }
    });
  }, []);

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({
          type: null,
          message: undefined,
        });
      }, 4000);
    }
  }, [alert]);

  return (
    <main className="w-full min-h-screen relative">
      {children}
      <AlertBox />
    </main>
  );
};
