import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Supply } from "../types/interfaces";

export const useSupply = (id: string) => {
  const [supply, setSupply] = useState<Supply | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSupply()
      .then(setSupply)
      .then(() => setLoading(false));
  }, []);

  const getSupply = async (): Promise<Supply | null> => {
    try {
      const { data, error } = await supabase
        .from("supplies")
        .select(
          "id, name, category, restaurant, um, waste, price, taxes_included"
        )
        .eq("id", id)
        .single();

      if (error) throw new Error("Error al cargar los detalles del insumo");

      if (!data) return null;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { supply, loading } as const;
};
