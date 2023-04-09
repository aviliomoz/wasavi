import { supabase } from "../supabase/browser-client";
import { Product } from "../types/interfaces";

export const getProducts = async (restaurant: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id,created_at,name,restaurant,status")
    .eq("restaurant", restaurant)
    .order("name");

  if (!data || error) return [];

  return data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("id,created_at,name,restaurant,status")
    .eq("id", id)
    .single();

  if (!data || error) return null;

  return data;
};

interface ProductInfo {
  name: string;
  restaurant: string;
}

export const createProduct = async (product: ProductInfo) => {
  try {
    const { error } = await supabase.from("products").insert(product);

    if (error) throw Error("Error al crear el producto");

    alert("Producto creado correctamente");
  } catch (error) {
    alert(error);
  }
};

export const updateProduct = async (product: ProductInfo, id: string) => {
  try {
    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id);

    if (error) throw Error("Error al editar el producto");

    alert("Producto actualizado correctamente");
  } catch (error) {
    alert(error);
  }
};

export const togleProduct = async (id: string, newStatus: boolean) => {
  try {
    const { error } = await supabase
      .from("products")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) throw Error("Error al cambiar el estado del producto");

    alert("Se ha cambiado el estado del producto correctamente");
  } catch (error) {
    alert(error);
  }
};
