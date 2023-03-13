import { getLocalData } from "./localStorage";
import { supabase } from "../services/supabase";
import { Product } from "../types/interfaces";

export const getProductsCount = async (): Promise<number> => {
  const { restaurant } = getLocalData();

  const { error, count } = await supabase
    .from("products")
    .select("id")
    .eq("restaurant", restaurant?.id);
  if (error) throw Error("Error al cargar los productos");
  if (!count) return 0;

  return count;
};

export const getProductsByPagination = async (
  pagination: number,
  productsPerPage: number
): Promise<Product[]> => {
  const { restaurant } = getLocalData();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_categories (id,name)")
    .eq("restaurant", restaurant?.id)
    .range(
      pagination * productsPerPage - productsPerPage,
      pagination * productsPerPage - 1
    );

  if (error) throw Error("Error al cargar los productos");

  return data;
};
