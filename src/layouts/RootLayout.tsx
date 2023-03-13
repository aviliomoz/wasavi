import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const RootLayout = () => {
  return (
    <div className="px-4 pb-10 relative min-h-[100svh]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="absolute bottom-0 left-0 border-t w-full flex items-center justify-center h-10">
        Wasavi - Versión: 1.0.0 - 2023
      </footer>
    </div>
  );
};
