import { create } from "zustand";

interface RestaurantStore {
  restaurant: string;
  currency: string;
  taxes: number;

  setRestaurantName: (name: string) => void;
  setCurrency: (currency: string) => void;
  setTaxes: (taxes: number) => void;
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  restaurant: "",
  currency: "",
  taxes: 18,

  setRestaurantName: (name: string) =>
    set((state) => ({
      ...state,
      restaurant: name,
    })),

  setCurrency: (currency: string) =>
    set((state) => ({
      ...state,
      currency,
    })),

  setTaxes: (taxes: number) =>
    set((state) => ({
      ...state,
      taxes,
    })),
}));
