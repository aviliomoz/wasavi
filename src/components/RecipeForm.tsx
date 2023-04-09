"use client";

import { ChangeEvent, useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  um: string;
  amount: string;
  price: number;
}

export const RecipeForm = () => {
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] = useState<Ingredient[]>([
    { name: "Prueba", id: "132", um: "Kg", amount: "0", price: 10 },
    { name: "Prueba", id: "133", um: "Kg", amount: "0", price: 10 },
  ]);

  const handleIngredientAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setRecipe(
      recipe.map((ingredient) => {
        if (ingredient.id === id) {
          ingredient.amount = e.target.value;
          return ingredient;
        } else {
          return ingredient;
        }
      })
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h2 className="font-semibold">Receta:</h2>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Buscar ingrediente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border bg-white py-1 px-3 rounded-md w-full"
        />
      </div>
      <ul className="flex flex-col gap-2 mt-4 w-full">
        {recipe.map((ingredient) => {
          return (
            <li className="flex justify-between" key={ingredient.id}>
              <span className="min-w-max">
                {ingredient.name} - {ingredient.um}
              </span>
              <label>
                <span className="mr-2">Cant:</span>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientAmountChange(e, ingredient.id)
                  }
                  className="border w-20 px-3 py-1 rounded-md"
                />
              </label>
              <strong>S/ {Number(ingredient.amount) * ingredient.price}</strong>
            </li>
          );
        })}
      </ul>
      {recipe.length > 0 && (
        <p className="mt-2 ml-auto">
          Costo de elaboración:{" "}
          <strong className="ml-2">
            S/{" "}
            {recipe.reduce(
              (total, ingredient) =>
                total + Number(ingredient.amount) * ingredient.price,
              0
            )}
          </strong>
        </p>
      )}
    </div>
  );
};
