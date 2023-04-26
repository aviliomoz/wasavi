import { useState, useEffect } from "react";
import { Ingredient } from "../utils/types";
import { useSuppliesStore } from "../stores/suppliesStore";
import { useSubproductsStore } from "../stores/subproductsStore";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useCalc } from "../hooks/useCalc";

import { FaTrash } from "react-icons/fa";

interface Props {
  recipe: Ingredient[];
  setRecipe: (recipe: Ingredient[]) => void;
}

interface Item {
  id: string;
  type: "supplies" | "subproducts";
  name: string;
  um: string;
}

export const RecipeForm = ({ recipe, setRecipe }: Props) => {
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { currency } = useRestaurantStore();
  const { calculateCost } = useCalc();
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems();
  }, [supplies, subproducts]);

  const addIngredient = (ingredient: Ingredient) => {
    setRecipe([...recipe, ingredient]);
    setSearch("");
  };

  const updateIngredientAmount = (id: string, amount: number) => {
    setRecipe(
      recipe.map((ingredient) => {
        if (ingredient.id === id) {
          ingredient.amount = amount;
          return ingredient;
        } else {
          return ingredient;
        }
      })
    );
  };

  const deleteIngredient = (id: string) => {
    setRecipe(recipe.filter((ingredient) => ingredient.id !== id));
  };

  const getItems = () => {
    const items: Item[] = [];

    supplies
      .filter((supply) => supply.status)
      .map((supply) =>
        items.push({
          type: "supplies",
          name: supply.name,
          um: supply.um,
          id: supply.id,
        })
      );

    subproducts
      .filter((subproduct) => subproduct.status)
      .map((subproduct) =>
        items.push({
          type: "subproducts",
          name: subproduct.name,
          um: subproduct.um,
          id: subproduct.id,
        })
      );

    setItems(items);
  };

  const getItemName = (id: string) => {
    return items.find((item) => item.id === id)?.name || "";
  };

  const getItemUm = (id: string) => {
    return items.find((item) => item.id === id)?.um || "";
  };

  const getSubproductAmount = (id: string): number => {
    const item = items.find((item) => item.id === id);
    if (item) {
      if (item.type === "subproducts") {
        const subproduct = subproducts.find(
          (subproduct) => subproduct.id === item.id
        );
        if (subproduct) {
          return subproduct.amount;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  };

  return (
    <div className="border rounded-md relative flex flex-col items-center mt-5 p-4">
      <h3 className="absolute -top-5 bg-white p-2 font-medium">Receta</h3>
      <div className="relative w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar insumo o sub producto"
          className="border mt-2 w-full rounded-full py-1 px-4 outline-none text-sm"
        />
        {search.length > 0 && (
          <ul className="p-2 absolute top-full mt-2 bg-white z-10 border rounded-md flex flex-col w-full">
            {items
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <i
                  key={item.id}
                  onClick={() =>
                    addIngredient({ id: item.id, type: item.type, amount: 0 })
                  }
                  className="flex gap-3 w-full hover:bg-gray-50 hover:border-gray-100 border border-transparent rounded-md px-2 py-1 cursor-pointer"
                >
                  <span className="text-emerald-500 text-xs rounded-full px-2 py-0.5 flex items-center">
                    {item.type === "supplies" ? "insumo" : "sub pro"}
                  </span>
                  <p>
                    {item.name} - {item.um}
                  </p>
                </i>
              ))}
            {items.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <p className="text-gray-400 font-light">Sin resultados</p>
            )}
          </ul>
        )}
      </div>
      <ul className="mt-4 w-full flex flex-col gap-2">
        {recipe.map((ingredient) => (
          <i
            key={ingredient.id}
            className="flex gap-2 justify-between items-center text-sm"
          >
            <p>{getItemName(ingredient.id)}</p>
            <div className="flex gap-2 min-w-max">
              <span className="ml-2">{getItemUm(ingredient.id)}</span>
              <input
                type="number"
                min={0}
                step={0.01}
                value={ingredient.amount.toFixed(2)}
                onChange={(e) =>
                  updateIngredientAmount(ingredient.id, Number(e.target.value))
                }
                className="w-16 border rounded-md px-2"
              />
              <p className="font-medium">
                {currency}{" "}
                {(
                  (calculateCost(ingredient.type, ingredient.id) *
                    ingredient.amount) /
                  getSubproductAmount(ingredient.id)
                ).toFixed(2)}
              </p>
              <FaTrash
                className="text-xs mt-1 ml-2 fill-gray-400 hover:fill-emerald-500 cursor-pointer"
                onClick={() => deleteIngredient(ingredient.id)}
              />
            </div>
          </i>
        ))}
      </ul>
    </div>
  );
};
