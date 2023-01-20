import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { User } from "../types/interfaces";

//Hooks
import { useLocalData } from "./useLocalData";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user: auth_id } = useLocalData();

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const getUser = async (): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, name")
        .eq("auth_id", auth_id)
        .single();

      if (error) throw new Error("Error al cargar los detalles del usuario");

      if (!data) return null;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { user, loading } as const;
};
