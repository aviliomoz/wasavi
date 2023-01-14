import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

interface User {
  id: string;
  name: string;
}

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const getUser = async (): Promise<User> => {
    const { data, error } = await supabase
      .from("users")
      .select("auth_id, name")
      .eq("auth_id", id)
      .single();

    if (error || !data) {
      return { id, name: "Cargando..." };
    }

    return { id, name: data.name };
  };

  return { user };
};
