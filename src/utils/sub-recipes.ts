import { supabase } from "../supabase/browser-client";
import { Subrecipe } from "../types/interfaces";

export const getSubrecipes = async (
  restaurant: string
): Promise<Subrecipe[]> => {
  const { data, error } = await supabase
    .from("sub-recipes")
    .select("id,created_at,name,um,amount,restaurant,status")
    .eq("restaurant", restaurant)
    .order("name");

  if (!data || error) return [];

  return data;
};

export const getSubrecipeById = async (
  id: string
): Promise<Subrecipe | null> => {
  const { data, error } = await supabase
    .from("sub-recipes")
    .select("id,created_at,name,um,amount,restaurant,status")
    .eq("id", id)
    .single();

  if (!data || error) return null;

  return data;
};

interface SubrecipeInfo {
  name: string;
  um: string;
  amount: number;
  restaurant: string;
}

export const createSubrecipe = async (subrecipe: SubrecipeInfo) => {
  try {
    const { error } = await supabase.from("sub-recipes").insert(subrecipe);

    if (error) throw Error("Error al crear la sub receta");

    alert("Sub receta creada correctamente");
  } catch (error) {
    alert(error);
  }
};

export const updateSubrecipe = async (subrecipe: SubrecipeInfo, id: string) => {
  try {
    const { error } = await supabase
      .from("sub-recipes")
      .update(subrecipe)
      .eq("id", id);

    if (error) throw Error("Error al editar la sub receta");

    alert("Sub receta actualizada correctamente");
  } catch (error) {
    alert(error);
  }
};

export const togleSubrecipe = async (id: string, newStatus: boolean) => {
  try {
    const { error } = await supabase
      .from("sub-recipes")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) throw Error("Error al cambiar el estado de la sub receta");

    alert("Se ha cambiado el estado de la sub receta correctamente");
  } catch (error) {
    alert(error);
  }
};
