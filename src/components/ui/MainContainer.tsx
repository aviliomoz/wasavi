import { Outlet } from "react-router-dom";
import { AlertBox } from "./AlertBox";

export const MainContainer = () => {
  return (
    <main className="w-full min-h-screen relative">
      <Outlet />
      <AlertBox />
    </main>
  );
};