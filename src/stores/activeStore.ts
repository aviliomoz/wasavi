import { create } from "zustand";
import { Product, Subproduct, Supply, Target } from "../utils/types";

interface ActiveStore {
  supplies: Supply | undefined;
  subproducts: Subproduct | undefined;
  products: Product | undefined;

  setActive: (target: Target, element: Supply | Subproduct | Product) => void;
  clearActive: (target: Target) => void;
}

export const useActiveStore = create<ActiveStore>((set) => ({
  supplies: undefined,
  subproducts: undefined,
  products: undefined,

  setActive: (target: Target, element: Supply | Subproduct | Product) => {
    set((state) => ({
      ...state,
      [target]: element,
    }));
  },
  clearActive: (target: Target) =>
    set((state) => ({
      ...state,
      [target]: undefined,
    })),
}));
