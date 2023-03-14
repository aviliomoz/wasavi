import { getLocalData } from "./localStorage";
import { supabase } from "../services/supabase";
import { Product, Supply, Target } from "../types/interfaces";

export const getElementsCount = async (target: Target): Promise<number> => {
  const { restaurant } = getLocalData();

  const { error, data } = await supabase
    .from(target)
    .select("id")
    .eq("restaurant", restaurant?.id);

  if (error) throw Error("Error al cargar los elementos");

  return data.length;
};

export const getElementsByPagination = async (
  target: Target,
  pagination: number,
  productsPerPage: number
): Promise<Product[] | Supply[]> => {
  const { restaurant } = getLocalData();

  const { data, error } = await supabase
    .from(target)
    .select(`*`)
    .eq("restaurant", restaurant?.id)
    .order("name")
    .range(
      pagination * productsPerPage - productsPerPage,
      pagination * productsPerPage - 1
    );

  if (error) throw Error("Error al cargar los elementos");

  return data;
};
