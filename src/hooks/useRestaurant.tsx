import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

interface Restaurant {
  id: string;
  name: string;
}

export const useRestaurant = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    getRestaurant().then(setRestaurant);
  }, []);

  const getRestaurant = async (): Promise<Restaurant> => {
    const { data, error } = await supabase
      .from("restaurants")
      .select("id, name")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { id, name: "Cargando..." };
    }

    return data;
  };

  return { restaurant };
};
