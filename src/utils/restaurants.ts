import { supabase } from "../supabase/browser-client";
import type { Restaurant } from "../types/interfaces";

export const getRestaurantsByUser = async (
  auth_id: string
): Promise<Restaurant[]> => {
  const { data, error } = await supabase
    .from("restaurants_users")
    .select("restaurants(id,name,currency,created_at)")
    .eq("user", auth_id);

  if (error) throw Error("Ha ocurrido un error al cargar los restaurantes");

  const restaurants: Restaurant[] = data.map(
    (element: any) => element.restaurants
  );

  return restaurants;
};

export const getRestaurantName = async (
  id: string
): Promise<string | undefined> => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("name")
    .eq("id", id)
    .single();

  if (error) throw Error("Error al cargar el restaurante");
  if (!data) return undefined;

  return data.name;
};
