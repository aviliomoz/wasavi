import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { supabase } from "../services/supabase";
import { cleanLocalData } from "../utils/localStorage";

export const RootLayout = () => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") cleanLocalData();
    });
  }, []);

  return (
    <div className="px-4 pb-14 relative min-h-[100svh]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="absolute bottom-0 left-0 border-t w-full flex items-center justify-center h-10 text-sm">
        Wasavi - Versión: 1.0.0 - 2023
      </footer>
    </div>
  );
};
