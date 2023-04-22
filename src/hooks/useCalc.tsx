import { useRestaurantStore } from "../stores/restaurantStore";
import { useSubproductsStore } from "../stores/subproductsStore";
import { useSuppliesStore } from "../stores/suppliesStore";
import { Ingredient, Subproduct, Supply, Target } from "../utils/types";

export const useCalc = () => {
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { taxes } = useRestaurantStore();

  const calculateSupplyCost = (
    price: number,
    taxes_included: boolean,
    taxes: number,
    waste: number
  ) => {
    if (taxes_included) {
      return price / (1 + taxes / 100) / (1 - waste / 100);
    } else {
      return price / (1 - waste / 100);
    }
  };

  const calculateSubproductCost = (recipe: Ingredient[]) => {
    return recipe.reduce((total, ingredient) => {
      return total + calculateCost(ingredient.type, ingredient.id);
    }, 0);
  };

  const searchCalculateSupplyCost = (id: string) => {
    const supply: Supply | undefined = supplies.find(
      (supply) => supply.id === id
    );

    if (!supply || !supply.status) return 0;

    return calculateSupplyCost(
      supply?.price,
      supply?.taxes_included,
      taxes,
      supply?.waste
    );
  };

  const findSupplies = (recipe: Ingredient[]): Supply[] => {
    let list: Supply[] = [];

    recipe.map((ingredient) => {
      if (ingredient.type === "supplies") {
        const supply: Supply | undefined = supplies.find(
          (supply) => supply.id === ingredient.id
        );
        if (supply && supply.status) {
          list.push(supply);
        }
      }

      if (ingredient.type === "subproducts") {
        const subproduct: Subproduct | undefined = subproducts.find(
          (subproduct) => subproduct.id === ingredient.id
        );
        if (subproduct && subproduct.status) {
          findSupplies(subproduct.recipe).map((supply) => list.push(supply));
        }
      }
    });

    return list;
  };

  const searchCalculateSubproductCost = (id: string) => {
    const subproduct: Subproduct | undefined = subproducts.find(
      (subproduct) => subproduct.id === id
    );

    if (!subproduct || !subproduct.status) return 0;

    let supplies: Supply[] = findSupplies(subproduct.recipe);

    return supplies.reduce((total, supply) => {
      return (
        total +
        calculateSupplyCost(
          supply.price,
          supply.taxes_included,
          taxes,
          supply.waste
        )
      );
    }, 0);
  };

  const calculateCost = (target: Target, id: string) => {
    switch (target) {
      case "supplies":
        return searchCalculateSupplyCost(id);

      case "subproducts":
        return searchCalculateSubproductCost(id);

      default:
        return 0;
    }
  };

  return {
    searchCalculateSupplyCost,
    searchCalculateSubproductCost,
    calculateSupplyCost,
    calculateSubproductCost,
    calculateCost,
  };
};
