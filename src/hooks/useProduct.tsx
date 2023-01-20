import { useEffect, useState } from "react";

// Services
import { supabase } from "../services/supabase";

// Types
import { Category, Product } from "../types/interfaces";

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setCategory(null);
    getProduct().then(setProduct);
  }, [id]);

  useEffect(() => {
    if (product) {
      getCategory(product.category).then(setCategory);
    }
  }, [product]);

  useEffect(() => {
    if (product && category) {
      setLoading(false);
    }
  }, [product, category]);

  const getProduct = async (): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `id, name, category, restaurant, um, amount, price, is_for_sale`
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

  return { product: { ...product, category }, loading } as const;
};
