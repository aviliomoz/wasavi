import { supabase } from "../supabase/browser-client";
import { Supply } from "../types/interfaces";

export const getSupplies = async (restaurant: string): Promise<Supply[]> => {
  const { data, error } = await supabase
    .from("supplies")
    .select(
      "id,created_at,name,um,price,waste,restaurant,taxes_included,status"
    )
    .eq("restaurant", restaurant)
    .order("name");

  if (!data || error) return [];

  return data;
};

export const getSupplyById = async (id: string): Promise<Supply | null> => {
  const { data, error } = await supabase
    .from("supplies")
    .select(
      "id,created_at,name,um,price,waste,restaurant,taxes_included,status"
    )
    .eq("id", id)
    .single();

  if (!data || error) return null;

  return data;
};

interface SupplyInfo {
  name: string;
  price: number;
  um: string;
  waste: number;
  restaurant: string;
  taxes_included: boolean;
}

export const createSupply = async (supply: SupplyInfo) => {
  try {
    const { error } = await supabase.from("supplies").insert(supply);

    if (error) throw Error("Error al crear el insumo");

    alert("Insumo creado correctamente");
  } catch (error) {
    alert(error);
  }
};

export const updateSupply = async (supply: SupplyInfo, id: string) => {
  try {
    const { error } = await supabase
      .from("supplies")
      .update(supply)
      .eq("id", id);

    if (error) throw Error("Error al editar el insumo");

    alert("Insumo actualizado correctamente");
  } catch (error) {
    alert(error);
  }
};

export const togleSupply = async (id: string, newStatus: boolean) => {
  try {
    const { error } = await supabase
      .from("supplies")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) throw Error("Error al cambiar el estado del insumo");

    alert("Se ha cambiado el estado del insumo correctamente");
  } catch (error) {
    alert(error);
  }
};
