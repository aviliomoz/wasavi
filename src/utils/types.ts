export type Target = "products" | "subproducts" | "supplies";
export type ShowMode = "default" | "create" | "edit";
export type Element = Supply | Subproduct | Product;

interface Ingredient {
  type: "supply" | "subproduct";
  id: string;
  amount: number;
}

export interface Supply {
  id: string;
  name: string;
  um: string;
  price: number;
  waste: number;
  taxes_included: boolean;
  status: boolean;
}

export interface Product {
  id: string;
  name: string;
  recipe: Ingredient[];
  status: boolean;
}

export interface Subproduct {
  id: string;
  name: string;
  um: string;
  amount: number;
  recipe: Ingredient[];
  status: boolean;
}

export interface Data {
  restaurant: string;
  currency: string;
  taxes: number;
  ums: string[];
  products: Product[];
  subproducts: Subproduct[];
  supplies: Supply[];
}
