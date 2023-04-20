import { create } from "zustand";
import { Supply } from "../utils/types";

interface SuppliesStore {
  supplies: Supply[];
  setSupplies: (supplies: Supply[]) => void;
  createSupply: (supply: Supply) => void;
  updateSupply: (id: string, edited_supply: Supply) => void;
  deleteSupply: (id: string) => void;
}

export const useSuppliesStore = create<SuppliesStore>((set) => ({
  supplies: [],

  setSupplies: (supplies: Supply[]) => set((state) => ({ ...state, supplies })),

  createSupply: (supply: Supply) =>
    set((state) => ({
      ...state,
      supplies: [...state.supplies, supply],
    })),

  updateSupply: (id: string, edited_supply: Supply) =>
    set((state) => ({
      ...state,
      supplies: state.supplies.map((supply) =>
        supply.id === id ? edited_supply : supply
      ),
    })),

  deleteSupply: (id: string) =>
    set((state) => ({
      ...state,
      supplies: state.supplies.map((supply) => {
        if (supply.id === id) {
          supply.status = false;
          return supply;
        } else {
          return supply;
        }
      }),
    })),
}));
