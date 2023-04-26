import { create } from "zustand";
import { Product } from "../utils/types";

interface ProductsStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (product: Product) => void;
  updateProduct: (id: string, edited_product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],

  setProducts: (products: Product[]) =>
    set((state) => ({ ...state, products })),

  createProduct: (product: Product) =>
    set((state) => ({
      ...state,
      products: [...state.products, product],
    })),

  updateProduct: (id: string, edited_product: Product) =>
    set((state) => ({
      ...state,
      products: state.products.map((product) =>
        product.id === id ? edited_product : product
      ),
    })),

  deleteProduct: (id: string) =>
    set((state) => ({
      ...state,
      products: state.products.map((product) => {
        if (product.id === id) {
          product.status = false;
          return product;
        } else {
          return product;
        }
      }),
    })),
}));
