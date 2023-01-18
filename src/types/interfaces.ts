import { AlertEnum, CurrencyEnum, UMEnum } from "./enums";

export interface Alert {
  type: AlertEnum | undefined;
  message: string | undefined;
}

export interface Validation {
  validated: boolean;
  message: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  um: UMEnum;
  amount: number;
  price: number;
  is_for_sale: boolean;
}

export interface Supply {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  um: UMEnum;
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
