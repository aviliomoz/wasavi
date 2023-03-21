import { supabase } from "../supabase/browser-client";
import type { Restaurant } from "../types/interfaces";

export const getRestaurantsByUser = async (
  user_id: string
): Promise<Restaurant[]> => {
  const { data, error } = await supabase
    .from("restaurants_users")
    .select("restaurants(*)")
    .eq("user", user_id);

  if (error)
    throw Error("Ha ocurrido un error al cargar los restaurantes");

  const restaurants = data.map(
    (element: { restaurants: Restaurant }) => element.restaurants
  );

  return restaurants;
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw Error("Error al cargar el restaurante");

  return data;
};
