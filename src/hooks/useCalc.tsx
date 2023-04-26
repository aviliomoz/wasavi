import { useProductsStore } from "../stores/productsStore";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useSubproductsStore } from "../stores/subproductsStore";
import { useSuppliesStore } from "../stores/suppliesStore";
import {
  Ingredient,
  Product,
  Subproduct,
  Supply,
  Target,
} from "../utils/types";

export const useCalc = () => {
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { products } = useProductsStore();
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

  const calculateSubproductCost = (recipe: Ingredient[]): number => {
    return recipe
      .map((ingredient) => {
        if (ingredient.type === "supplies") {
          const supply = supplies.find((supply) => supply.id === ingredient.id);
          if (supply && supply.status) {
            return searchCalculateSupplyCost(ingredient.id) * ingredient.amount;
          } else {
            return 0;
          }
        } else if (ingredient.type === "subproducts") {
          const subproduct: Subproduct | undefined = subproducts.find(
            (subproduct) => subproduct.id === ingredient.id
          );
          if (subproduct && subproduct.status) {
            return (
              (calculateSubproductCost(subproduct.recipe) * ingredient.amount) /
              subproduct.amount
            );
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      })
      .reduce((total, cost) => {
        return total + cost;
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

  const searchCalculateSubproductCost = (id: string) => {
    const subproduct: Subproduct | undefined = subproducts.find(
      (subproduct) => subproduct.id === id
    );

    if (!subproduct || !subproduct.status) return 0;

    return calculateSubproductCost(subproduct.recipe);
  };

  const searchCalculateProductCost = (id: string) => {
    const product: Product | undefined = products.find(
      (product) => product.id === id
    );

    if (!product || !product.status) return 0;

    return calculateSubproductCost(product.recipe);
  };

  const calculateCost = (target: Target, id: string) => {
    switch (target) {
      case "supplies":
        return searchCalculateSupplyCost(id);

      case "subproducts":
        return searchCalculateSubproductCost(id);

      case "products":
        return searchCalculateProductCost(id);

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
