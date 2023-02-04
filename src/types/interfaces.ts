export interface Alert {
  type: "ERROR" | "SUCCESS" | undefined;
  message: string | undefined;
}

export interface Validation {
  ok: boolean;
  message: string | undefined;
}

export type UM = "KG" | "LT" | "UND" | undefined;

export interface Product {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  um: UM;
  amount: number;
  price: number;
  is_for_sale: boolean;
}

export interface Supply {
  id: string;
  name: string;
  category: string;
  categories: {
    name: string;
  };
  restaurant: string;
  um: UM;
  waste: number;
  price: number;
  taxes_included: boolean;
  created_at: string;
  status: boolean;
}

export interface User {
  id: string;
  name: string;
}

export type Currency = "USD" | "EUR" | "PEN" | undefined;

export interface Restaurant {
  id: string;
  name: string;
  currency: Currency;
  buy_taxes: number;
  sell_taxes: number;
}

export interface LocalData {
  user: string | undefined;
  restaurant: Restaurant | undefined;
}

export interface Category {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
}
