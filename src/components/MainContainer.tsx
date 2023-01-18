import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";

// Utils
import { alertState } from "../contexts/alertState";

// Components
import { AlertBox } from "./ui/AlertBox";

export const MainContainer = () => {
  const [alert, setAlert] = useRecoilState(alertState);

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

  return (
    <main className="w-full min-h-screen relative">
      <Outlet />
      <AlertBox />
    </main>
  );
};
