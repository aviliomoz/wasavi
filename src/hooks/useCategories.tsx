import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Hooks
import { useLocalData } from "./useLocalData";

// Types
import { Category } from "../types/interfaces";

export const useCategories = (
  type: "products" | "supplies",
  id: string | null = null
) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { restaurant } = useLocalData();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (categories) {
      setLoading(false);
    }
  }, [categories]);

  const getCategories = async (): Promise<Category[]> => {
    try {
      let query = supabase
        .from("categories")
        .select("id, name")
        .eq("restaurant", restaurant?.id)
        .eq("type", type);

      if (id) {
        query = query.eq("id", id);
      }

      const { data, error } = await query;

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
