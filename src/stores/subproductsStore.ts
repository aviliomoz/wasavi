import { create } from "zustand";
import { Subproduct } from "../utils/types";

interface SubproductsStore {
  subproducts: Subproduct[];
  setSubproducts: (subproducts: Subproduct[]) => void;
  createSubproduct: (subproduct: Subproduct) => void;
  updateSubproduct: (id: string, edited_subproduct: Subproduct) => void;
  deleteSubproduct: (id: string) => void;
}

export const useSubproductsStore = create<SubproductsStore>((set) => ({
  subproducts: [],

  setSubproducts: (subproducts: Subproduct[]) =>
    set((state) => ({ ...state, subproducts })),

  createSubproduct: (subproduct: Subproduct) =>
    set((state) => ({
      ...state,
      subproducts: [...state.subproducts, subproduct],
    })),

  updateSubproduct: (id: string, edited_subproduct: Subproduct) =>
    set((state) => ({
      ...state,
      subproducts: state.subproducts.map((subproduct) =>
        subproduct.id === id ? edited_subproduct : subproduct
      ),
    })),

  deleteSubproduct: (id: string) =>
    set((state) => ({
      ...state,
      subproducts: state.subproducts.map((subproduct) => {
        if (subproduct.id === id) {
          subproduct.status = false;
          return subproduct;
        } else {
          return subproduct;
        }
      }),
    })),
}));
