import { useEffect } from "react";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useSuppliesStore } from "../stores/suppliesStore";
import { dataname, initialData } from "../utils/consts";
import { Data } from "../utils/types";

export const useStorage = () => {
  const {
    restaurant,
    setRestaurantName,
    currency,
    setCurrency,
    taxes,
    setTaxes,
  } = useRestaurantStore();
  const { supplies, setSupplies } = useSuppliesStore();

  useEffect(() => {
    const save = setTimeout(() => saveData(), 500);
    return () => clearTimeout(save);
  }, [supplies, restaurant, currency, taxes]);

  const loadData = () => {
    const data: Data = JSON.parse(
      localStorage.getItem(dataname) || JSON.stringify(initialData)
    );

    setSupplies(data.supplies);
    setRestaurantName(data.restaurant);
    setCurrency(data.currency);
    setTaxes(data.taxes);
  };

  const saveData = () => {
    const data: Data = {
      ...initialData,
      supplies,
      restaurant,
      currency,
      taxes,
    };

    localStorage.setItem(dataname, JSON.stringify(data));
  };

  return { loadData, saveData };
};
