import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Restaurant } from "../types/interfaces";

export const useRestaurant = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRestaurant()
      .then(setRestaurant)
      .then(() => setLoading(false));
  }, []);

  const getRestaurant = async (): Promise<Restaurant | null> => {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name")
        .eq("id", id)
        .single();

      if (error)
        throw new Error("Error al cargar los detalles del restaurante");

      if (!data) return null;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { restaurant, loading } as const;
};
