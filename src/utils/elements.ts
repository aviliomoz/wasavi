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
    .range(
      pagination * productsPerPage - productsPerPage,
      pagination * productsPerPage - 1
    );

  if (error) throw Error("Error al cargar los elementos");

  return data;
};

export const getSupplyById = async (id: string): Promise<Supply> => {
  const { restaurant } = getLocalData();

  const { data, error } = await supabase
    .from("supplies")
    .select(`*`)
    .eq("restaurant", restaurant?.id)
    .eq("id", id)
    .single();

  if (error) throw Error("Error al cargar elemento");

  return data;
};

export const createSupply = async (supply: {
  name: string;
  restaurant: string;
  price: number;
  um: string;
  waste: number;
  taxes_included: boolean;
}) => {
  const { error } = await supabase.from("supplies").insert(supply);

  if (error) throw Error("Error al crear insumo");

  alert("Se ha creado el insumo correctamente");
};
