import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Product } from "../types/interfaces";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProduct()
      .then(setProduct)
      .then(() => setLoading(false));
  }, []);

  const getProduct = async (): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, category, restaurant, um, amount, price, is_for_sale"
        )
        .eq("id", id)
        .single();

      if (error) throw new Error("Error al cargar los detalles del producto");

      if (!data) return null;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { product, loading } as const;
};
