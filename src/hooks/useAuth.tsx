import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

// Types
import { Session } from "@supabase/supabase-js";

// Hooks
import { useLocalData } from "./useLocalData";

// Services
import { supabase } from "../services/supabase";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { cleanLocalData } = useLocalData();

  useEffect(() => {
    getSession()
      .then(setSession)
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && event == "PASSWORD_RECOVERY") redirect("/reset");
    });
  }, []);

  const getSession = async (): Promise<Session | null> => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw new Error("Error al cargar la sesión del usuario");

      if (!session) return null;

      return session;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error("Error al cerrar la sesión");

      cleanLocalData();
      document.location.assign("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { session, loading, logout } as const;
};
