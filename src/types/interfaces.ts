export interface Validation {
  ok: boolean;
  message: string | undefined;
}

export interface User {
  id: string;
  name: string;
  auth_id: string;
  created_at: Date;
}

export interface LocalData {
  user: User | undefined;
  restaurant: Restaurant | undefined;
}

export type Currency = "PEN" | "EUR" | "USD";

export interface Restaurant {
  id: string;
  name: string;
  currency: Currency;
  created_at: Date;
}

export interface Product {
  id: string;
  name: string;
  restaurant: string;
  um: string;
  amount: number;
  price: number;
  created_at: Date;
}

export interface Supply {
  id: string;
  name: string;
  restaurant: string;
  um: string;
  price: number;
  waste: number;
  taxes_included: boolean;
  created_at: Date;
}

export type Target = "products" | "supplies";
