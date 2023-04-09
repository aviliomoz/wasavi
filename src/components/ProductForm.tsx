"use client";

import { useState, useEffect } from "react";
import {
  createProduct,
  getProductById,
  togleProduct,
  updateProduct,
} from "../utils/products";
import { useRouter } from "next/navigation";
import { RecipeForm } from "./RecipeForm";

interface Props {
  mode: "create" | "edit";
  user: string;
  restaurant: string;
  product_id?: string;
}

export const ProductForm = ({ mode, user, restaurant, product_id }: Props) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && product_id) {
      getProductById(product_id).then((product) => {
        if (product) {
          setName(product.name);
          setStatus(product.status);
        }

        setLoading(false);
      });
    }

    if (mode === "create") setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    if (mode === "create") {
      await createProduct({
        name,
        restaurant,
      });
    }

    if (mode === "edit" && product_id) {
      await updateProduct(
        {
          name,
          restaurant,
        },
        product_id
      );
    }

    setSaving(false);
    router.push(`/${user}/${restaurant}/products`);
  };

  const handleToggleState = async () => {
    const action = status ? "anular" : "activar";

    const confirmation = confirm(
      `¿Seguro que quieres ${action} este producto?`
    );

    if (confirmation && product_id) {
      await togleProduct(product_id, !status);
      router.push(`/${user}/${restaurant}/products`);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-2">
      <label className="flex items-center gap-2">
        <strong>Nombre:</strong>
        <input
          className="border rounded-md px-3 py-1 w-full"
          type="text"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
      </label>

      <RecipeForm />

      <div className="flex items-center gap-2">
        {mode === "edit" && status && product_id && (
          <button
            type="button"
            onClick={() => handleToggleState()}
            className="text-red-500 font-medium rounded-md py-2 px-4 mt-6"
          >
            Anular
          </button>
        )}
        {mode === "edit" && !status && product_id && (
          <button
            type="button"
            onClick={() => handleToggleState()}
            className=" text-emerald-500 font-medium rounded-md py-2 px-4 mt-6"
          >
            Activar
          </button>
        )}
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white font-medium rounded-md p-2 mt-6"
        >
          {saving ? "Guardando" : "Guardar producto"}
        </button>
      </div>
    </form>
  );
};
