import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

// Types
import { Supply } from "../types/interfaces";
import { useLocalData } from "./useLocalData";

export const useSupplies = () => {
  const [supplies, setSupplies] = useState<Supply[]>();
  const [loading, setLoading] = useState(true);
  const { restaurant } = useLocalData();

  useEffect(() => {
    setLoading(true);
    getSupplies().then(setSupplies);
  }, []);

  useEffect(() => {
    if (supplies) setLoading(false);
  }, [supplies]);

  const getSupplies = async () => {
    const { data, error } = await supabase
      .from("supplies")
      .select("*, categories ( name )")
      .eq("restaurant", restaurant?.id)
      .order("name");

    if (error) throw new Error("Error al cargar los insumos");
    if (!data) return [];

    return data;
  };

  return { supplies, loading } as const;
};
