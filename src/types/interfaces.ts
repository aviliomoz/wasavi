export interface Validation {
  ok: boolean;
  message: string | undefined;
}

export type Target = "products" | "sub-recipes" | "supplies";

export interface Element {
  id: string;
  name: string;
  status: boolean;
}

export interface Restaurant {
  id: string;
  created_at: Date;
  name: string;
  currency: string;
  status: boolean;
}

export interface Supply {
  id: string;
  created_at: Date;
  name: string;
  price: number;
  um: string;
  waste: number;
  restaurant: string;
  taxes_included: boolean;
  status: boolean;
}

export interface Product {
  id: string;
  created_at: Date;
  name: string;
  restaurant: string;
  status: boolean;
}

export interface Subrecipe {
  id: string;
  created_at: Date;
  name: string;
  restaurant: string;
  um: string,
  amount: number,
  status: boolean;
}