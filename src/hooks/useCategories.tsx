import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Hooks
import { useLocalData } from "./useLocalData";

// Types
import { Category } from "../types/interfaces";

export const useCategories = (type: "products" | "supplies") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { restaurant } = useLocalData();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .then(() => setLoading(false));
  }, []);

  const getCategories = async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .eq("restaurant", restaurant)
        .eq("type", type);

      if (error) throw new Error("Error al cargar las categorías");

      if (!data) return [];

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { categories, loading } as const;
};
