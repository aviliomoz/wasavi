"use client";

import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";

// Types
import { Ingredient, Product } from "@/src/utils/types";

// Stores
import { useProductsStore } from "../stores/productsStore";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useModeStore } from "../stores/modeStore";
import { useCalc } from "../hooks/useCalc";
import { RecipeForm } from "./RecipeForm";

interface Props {
  product?: Product;
}

export const ProductForm = ({ product }: Props) => {
  const { setShowMode } = useModeStore();
  const { updateProduct, createProduct, deleteProduct } = useProductsStore();
  const { currency, taxes } = useRestaurantStore();
  const { calculateSubproductCost } = useCalc();

  // Form elements
  const [name, setName] = useState<string>(product?.name || "");
  const [recipe, setRecipe] = useState<Ingredient[]>(product?.recipe || []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (product) {
      updateProduct(product.id, {
        id: product.id,
        name,
        recipe,
        status: product.status,
        sold: product.sold
      });
    }

    if (!product) {
      createProduct({
        id: uuidv4(),
        name,
        recipe,
        status: true,
        sold: 0
      });
    }

    setShowMode("products", "default");
  };

  return (
    <>
      {!product && <h3 className="font-semibold mb-6">Crear sub producto:</h3>}
      {product && <h3 className="font-semibold mb-6">Editar sub producto:</h3>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="flex gap-2 items-center">
          <span>Nombre:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-2"
          />
        </label>

        <label className="flex gap-2 items-center">
          <span>Costo final:</span>
          <span>{currency}</span>
          <input
            type="number"
            value={calculateSubproductCost(recipe).toFixed(2)}
            disabled
            className="w-24 border rounded-md px-2"
          />
        </label>
        <RecipeForm recipe={recipe} setRecipe={setRecipe} />
        <div className="flex items-center gap-2 justify-center mt-6">
          {product && (
            <button
              onClick={() => deleteProduct(product.id)}
              className="border rounded-full px-3 w-32 py-1"
            >
              Eliminar
            </button>
          )}
          <button
            type="submit"
            className="bg-emerald-500 rounded-full px-3 text-white w-32 py-1"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
