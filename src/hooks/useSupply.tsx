import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Category, Supply } from "../types/interfaces";

export const useSupply = (id: string | undefined) => {
  const [supply, setSupply] = useState<Supply | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setCategory(null);
    getSupply().then(setSupply);
  }, [id]);

  useEffect(() => {
    if (supply) {
      getCategory(supply.category).then(setCategory);
    }
  }, [supply]);

  useEffect(() => {
    if (supply && category) {
      setLoading(false);
    }
  }, [supply, category]);

  const getSupply = async (): Promise<Supply | null> => {
    try {
      const { data, error } = await supabase
        .from("supplies")
        .select(
          `id, name, category, restaurant, um, waste, price, taxes_included`
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

  const getCategory = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select(`id, name`)
        .eq("id", id)
        .single();

      if (error) throw new Error("Error al cargar la categoría");

      if (!data) return null;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { supply: { ...supply, category }, loading } as const;
};
