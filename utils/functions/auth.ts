import { supabase } from "../../supabase";

// Types
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Restaurant, User } from "../interfaces";

export const getUserData = async (user: SupabaseUser): Promise<User | null> => {
  const { data, error: userError } = await supabase
    .from("users")
    .select("id, auth_id, name")
    .eq("auth_id", user.id)
    .single();

  if (userError || !data) {
    return null;
  }

  const restaurants = await getRestaurants(user.id);

  return { ...data, restaurants };
};

const getRestaurants = async (authID: string): Promise<string[] | []> => {
  const { data: restaurants, error } = await supabase
    .from("restaurants_users")
    .select("restaurant")
    .eq("user", authID);

  if (error || !restaurants) {
    return [];
  }

  return restaurants.map((r: { restaurant: string }) => r.restaurant);
};

export const getRestaurantData = async (
  id: string
): Promise<Restaurant | null> => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id, name, currency")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};
