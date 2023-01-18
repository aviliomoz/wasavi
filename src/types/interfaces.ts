export interface Alert {
  type: "ERROR" | "SUCCESS" | undefined;
  message: string | undefined;
}

export interface Validation {
  ok: boolean;
  message: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  um: "UND" | "KG" | "LT";
  amount: number;
  price: number;
  is_for_sale: boolean;
}

export interface Supply {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  um: "UND" | "KG" | "LT";
  waste: number;
  price: number;
  taxes_included: boolean;
}

export interface User {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
}

export interface LocalData {
  user: string;
  restaurant: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
}
