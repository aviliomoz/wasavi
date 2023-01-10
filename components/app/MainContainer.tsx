import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// Utils
import { alertState } from "../../recoil/alert";
import { supabase } from "../../supabase";
import { getLocalData } from "../../utils/functions/local";

// Components
import { AlertBox } from "../ui/AlertBox";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MainContainer = ({ children }: Props) => {
  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {
    const data = getLocalData();

    if (
      (!data || !data.user || !data.user.id) &&
      ![
        "/",
        "/auth/login",
        "/auth/signup",
        "/auth/password-recovery",
        "/auth/password-reset",
      ].includes(document.location.pathname)
    ) {
      supabase.auth.signOut().then(({ error }) => {
        if (!error) document.location.assign("/auth/login");
        localStorage.clear();
      });

      setAlert({
        type: "error",
        message: "No has iniciado sesión",
      });
    }
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
