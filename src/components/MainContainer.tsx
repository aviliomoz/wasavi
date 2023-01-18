import { redirect } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

// Utils
import { alertState } from "../contexts/alertState";

// Components
import { AlertBox } from "./ui/AlertBox";

// Hooks
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MainContainer = ({ children }: Props) => {
  const [alert, setAlert] = useRecoilState(alertState);
  const { session, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        logout();
      }
    }
  }, [loading, session]);

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({
          type: undefined,
          message: undefined,
        });
      }, 4000);
    }
  }, [alert]);

  return !loading ? (
    <main className="w-full min-h-screen relative">
      {children}
      <AlertBox />
    </main>
  ) : (
    <></>
  );
};
