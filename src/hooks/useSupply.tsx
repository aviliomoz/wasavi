import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Supply } from "../types/interfaces";

export const useSupply = (id: string | undefined) => {
  const [supply, setSupply] = useState<Supply>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getSupply().then(setSupply);
  }, [id]);

  useEffect(() => {
    if (supply) {
      setLoading(false);
    }
  }, [supply]);

  const getSupply = async (): Promise<Supply | undefined> => {
    try {
      const { data, error } = await supabase
        .from("supplies")
        .select(`*, categories ( name )`)
        .eq("id", id)
        .single();

      if (error) throw new Error("Error al cargar los detalles del insumo");

      if (!data) return undefined;

      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return { supply, loading } as const;
};
