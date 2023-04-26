"use client";

import { useProductsStore } from "@/src/stores/productsStore";
import { useSuppliesStore } from "@/src/stores/suppliesStore";
import { useEffect } from "react";
import { useStorage } from "@/src/hooks/useStorage";
import { useRestaurantStore } from "@/src/stores/restaurantStore";
import { Ingredient } from "@/src/utils/types";
import { useSubproductsStore } from "@/src/stores/subproductsStore";
import { useCalc } from "@/src/hooks/useCalc";

export default function ConverterPage() {
  const { loadData } = useStorage();

  const { products, updateProduct } = useProductsStore();
  const { subproducts } = useSubproductsStore();
  const { supplies } = useSuppliesStore();
  const { currency } = useRestaurantStore();
  const { searchCalculateSupplyCost } = useCalc();

  useEffect(() => {
    loadData();
  }, []);

  const getSupplyUse = (recipe: Ingredient[], id: string): number => {
    return recipe
      .map((ingredient) => {
        if (ingredient.type === "supplies" && ingredient.id === id) {
          const supply = supplies.find((supply) => supply.id === ingredient.id);
          if (supply && supply.status) {
            return ingredient.amount;
          } else {
            return 0;
          }
        } else if (ingredient.type === "subproducts") {
          const subproduct = subproducts.find(
            (subproduct) => subproduct.id === ingredient.id
          );
          if (subproduct && subproduct.status) {
            return (
              (getSupplyUse(subproduct.recipe, id) * ingredient.amount) /
              subproduct.amount
            );
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      })
      .reduce((total, count) => {
        return total + count;
      }, 0);
  };

  const countSupplyAmount = (id: string): number => {
    return products
      .filter((product) => product.status)
      .map((product) => {
        return getSupplyUse(product.recipe, id) * product.sold;
      })
      .reduce((total, count) => {
        return total + count;
      }, 0);
  };

  return (
    <section className="grid grid-flow-col grid-cols-10 gap-4">
      <div className="bg-white rounded-md p-6 col-span-4 border h-min">
        <h3 className="font-semibold text-center mb-8">Venta por producto</h3>
        <div className="flex my-6 justify-between items-center font-semibold text-sm pr-10 pl-4">
          <span>Nombre del producto</span>
          <span>Cantidad vendida</span>
        </div>
        <ul className="flex flex-col gap-2">
          {products
            .filter((product) => product.status)
            .map((product) => {
              return (
                <li
                  key={product.id}
                  className="flex items-center justify-between pr-14 pl-4"
                >
                  <p>{product.name}</p>
                  <input
                    className="border rounded-md py-1 px-3 w-24"
                    type="number"
                    min={0}
                    step={1}
                    value={product.sold}
                    onChange={(e) =>
                      updateProduct(product.id, {
                        ...product,
                        sold: Number(e.target.value),
                      })
                    }
                  />
                </li>
              );
            })}
        </ul>
      </div>
      <div className="bg-white rounded-md p-6 col-span-6 border h-min">
        <h3 className="font-semibold text-center mb-8">
          Cantidad empleada por insumo
        </h3>
        <div className="flex my-6 justify-between items-center font-semibold text-sm pr-10 pl-4">
          <span>Nombre del insumo</span>
          <div className="mr-6">
            <span className="mr-16">Cantidad limpia</span>
            <span>Cantidad bruta</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {supplies
            .filter((supply) => supply.status)
            .map((supply) => {
              return (
                <li
                  key={supply.id}
                  className="flex items-center justify-between pr-14 pl-4"
                >
                  <p>{supply.name}</p>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <span>{supply.um}</span>
                      <input
                        className="border rounded-md py-1 px-3 w-24"
                        type="number"
                        value={countSupplyAmount(supply.id).toFixed(2)}
                        disabled
                      />
                    </label>
                    <label className="flex items-center gap-2 ml-12">
                      <span>{supply.um}</span>
                      <input
                        className="border rounded-md py-1 px-3 w-24"
                        type="number"
                        value={(
                          countSupplyAmount(supply.id) *
                          (1 + (supply.waste / 100))
                        ).toFixed(2)}
                        disabled
                      />
                    </label>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
