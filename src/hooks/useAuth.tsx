import { useState, useEffect } from "react";

// Types
import { Session } from "@supabase/supabase-js";

// Hooks
import { useLocalData } from "./useLocalData";

// Services
import { supabase } from "../services/supabase";
import {
  validateLogin,
  validateRecovery,
  validateSignup,
} from "../utils/validators";

//Recoil
import { useSetRecoilState } from "recoil";
import { alertState } from "../contexts/alertState";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { cleanLocalData, updateUser } = useLocalData();

  const setAlert = useSetRecoilState(alertState);

  useEffect(() => {
    getSession()
      .then(setSession)
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event == "PASSWORD_RECOVERY") {
        updateUser(session.user.id);
      }
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

  const login = async (email: string, password: string) => {
    const validation = validateLogin(email, password);

    if (!validation.ok) {
      return setAlert({ type: "ERROR", message: validation.message });
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !user) throw new Error("Error al iniciar sesión");

      updateUser(user.id);
      document.location.assign("/home");
    } catch (error) {
      console.error(error);
      setAlert({
        type: "ERROR",
        message: "Los datos ingresados son inválidos",
      });
    }
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    const validation = validateSignup(name, email, password);

    if (!validation.ok) {
      return setAlert({ type: "ERROR", message: validation.message });
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error || !user)
        return setAlert({
          type: "ERROR",
          message: "Ha ocurrido un error al registrar el usuario",
        });

      const { error: insertError } = await supabase
        .from("users")
        .insert({ name, auth_id: user.id });

      if (!insertError) {
        updateUser(user.id);
        document.location.assign("/home");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const recovery = async (email: string) => {
    const validation = validateRecovery(email);

    if (!validation.ok) {
      return setAlert({ type: "ERROR", message: validation.message });
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error || !data)
        return setAlert({
          type: "ERROR",
          message: "Ha ocurrido un error al enviar el correo de recuperación",
        });

      return setAlert({
        type: "SUCCESS",
        message: `Se ha enviado un correo de recuperación a: ${email}`,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return { session, loading, logout, login, signup, recovery } as const;
};
