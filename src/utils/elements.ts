import { supabase } from "../supabase/browser-client";
import { Element, Target } from "../types/interfaces";

export const getElementsList = async (
  target: Target,
  restaurant: string
): Promise<Element[]> => {
  try {
    const { data, error } = await supabase
      .from(target)
      .select("id, name, status")
      .eq("restaurant", restaurant)
      .order("name");

    if (!data) return [];
    if (error) throw Error("Error al obtener la lista de " + target);

    return data;
  } catch (error) {
    alert(error);
    return [];
  }
};
