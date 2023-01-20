import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Item } from "../types/interfaces";

// Hooks
import { useLocalData } from "./useLocalData";

export const useItems = (type: "supplies" | "products") => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { restaurant } = useLocalData();

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  useEffect(() => {
    if (items) {
      setLoading(false);
    }
  }, [items]);

  const getItems = async (): Promise<Item[]> => {
    try {
      const { data, error } = await supabase
        .from(type)
        .select("id, name")
        .eq("restaurant", restaurant?.id);

      if (error) throw new Error("Error al cargar lista de items");

      if (!data) return [];

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { items, loading } as const;
};
