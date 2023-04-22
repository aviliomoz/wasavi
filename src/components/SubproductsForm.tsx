"use client";

import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";

// Types
import { Ingredient, Subproduct } from "@/src/utils/types";

// Consts
import { ums } from "../utils/consts";

// Stores
import { useSubproductsStore } from "../stores/subproductsStore";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useModeStore } from "../stores/modeStore";
import { useCalc } from "../hooks/useCalc";
import { RecipeForm } from "./RecipeForm";

interface Props {
  subproduct?: Subproduct;
}

export const SubproductForm = ({ subproduct }: Props) => {
  const { setShowMode } = useModeStore();
  const { updateSubproduct, createSubproduct, deleteSubproduct } =
    useSubproductsStore();
  const { currency, taxes } = useRestaurantStore();
  const { calculateSubproductCost } = useCalc();

  // Form elements
  const [name, setName] = useState<string>(subproduct?.name || "");
  const [um, setUm] = useState<string>(subproduct?.um || "Kg");
  const [amount, setAmount] = useState<number>(subproduct?.amount || 0);
  const [recipe, setRecipe] = useState<Ingredient[]>(subproduct?.recipe || []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (subproduct) {
      updateSubproduct(subproduct.id, {
        id: subproduct.id,
        name,
        um,
        amount,
        recipe,
        status: subproduct.status,
      });
    }

    if (!subproduct) {
      createSubproduct({
        id: uuidv4(),
        name,
        um,
        amount,
        recipe,
        status: true,
      });
    }

    setShowMode("subproducts", "default");
  };

  return (
    <>
      {!subproduct && (
        <h3 className="font-semibold mb-6">Crear sub producto:</h3>
      )}
      {subproduct && (
        <h3 className="font-semibold mb-6">Editar sub producto:</h3>
      )}

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
          <span>Unidad de medida:</span>
          <select
            value={um}
            onChange={(e) => setUm(e.target.value)}
            className="border rounded-md px-1"
          >
            {ums.map((um) => {
              return (
                <option key={um} value={um}>
                  {um}
                </option>
              );
            })}
          </select>
        </label>
        <label className="flex gap-2 items-center">
          <span>Cantidad preparada:</span>
          <span>{um}</span>
          <input
            type="number"
            value={amount}
            min={0}
            step={0.1}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-24 border rounded-md px-2"
          />
        </label>
        <label className="flex gap-2 items-center">
          <span>Costo final:</span>
          <span>{currency}</span>
          <input
            type="number"
            value={calculateSubproductCost(recipe).toFixed(2)}
            disabled
            className="w-20 border rounded-md px-2"
          />
        </label>
        <RecipeForm recipe={recipe} setRecipe={setRecipe} />
        <div className="flex items-center gap-2 justify-center mt-6">
          {subproduct && (
            <button
              onClick={() => deleteSubproduct(subproduct.id)}
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
