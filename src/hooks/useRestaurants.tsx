import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Hooks
import { useLocalData } from "./useLocalData";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useLocalData();

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  useEffect(() => {
    if (restaurants) {
      setLoading(false);
    }
  }, [restaurants]);

  const getRestaurants = async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from("restaurants_users")
        .select("restaurant")
        .eq("user", user);

      if (error) throw new Error("Error al cargar lista de restaurantes");

      if (!data) return [];

      return data.map((res) => res.restaurant);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { restaurants, loading } as const;
};
