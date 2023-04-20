import { useRestaurantStore } from "../stores/restaurantStore";
import { useSuppliesStore } from "../stores/suppliesStore";
import { Target } from "../utils/types";

export const useCalc = () => {
  const { supplies } = useSuppliesStore();
  const { taxes } = useRestaurantStore();

  const calculateSupplyCost = (
    price: number,
    taxes_included: boolean,
    taxes: number,
    waste: number
  ) => {
    if (taxes_included) {
      return (price / (1 + taxes / 100) / (1 - waste / 100)).toFixed(2);
    } else {
      return (price / (1 - waste / 100)).toFixed(2);
    }
  };

  const searchCalculateSupplyCost = (id: string) => {
    const supply = supplies.find((supply) => supply.id === id);

    if (!supply) return 0;

    return calculateSupplyCost(
      supply?.price,
      supply?.taxes_included,
      taxes,
      supply?.waste
    );
  };

  const calculateCost = (target: Target, id: string) => {
    switch (target) {
      case "supplies":
        return searchCalculateSupplyCost(id);

      default:
        break;
    }
  };

  return { calculateSupplyCost, calculateCost, searchCalculateSupplyCost };
};
