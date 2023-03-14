import { supabase } from "../services/supabase";
import { Supply } from "../types/interfaces";
import { getLocalData } from "./localStorage";

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

interface SupplyInfo {
  name: string;
  restaurant: string;
  price: number;
  um: string;
  waste: number;
  taxes_included: boolean;
}

export const createSupply = async (supply: SupplyInfo) => {
  const { error } = await supabase.from("supplies").insert(supply);

  if (error) throw Error("Error al crear insumo");

  alert("Se ha creado el insumo correctamente");
};

export const updateSupply = async (id: string, supply: SupplyInfo) => {
  const { error } = await supabase.from("supplies").update(supply).eq("id", id);

  if (error) throw Error("Error al actualizar insumo");

  alert("Se ha actualizado el insumo correctamente");
};

export const deleteSupply = async (id: string) => {
  const { error } = await supabase.from("supplies").delete().eq("id", id);
  const { error: recipeError } = await supabase
    .from("products_supplies")
    .delete()
    .eq("supply", id);

  if (error || recipeError) throw Error("Error al eliminar insumo");

  alert("Se ha eliminado el insumo correctamente");
};
