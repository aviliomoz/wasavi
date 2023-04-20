import { create } from "zustand";
import { Target } from "../utils/types";
import { ShowMode } from "../utils/types";

interface ModeStore {
  supplies: ShowMode;
  subproducts: ShowMode;
  products: ShowMode;

  setShowMode: (target: Target, mode: ShowMode) => void;
}

export const useModeStore = create<ModeStore>((set) => ({
  supplies: "default",
  subproducts: "default",
  products: "default",

  setShowMode: (target: Target, mode: ShowMode) => {
    set((state) => ({
      ...state,
      [target]: mode,
    }));
  },
}));
