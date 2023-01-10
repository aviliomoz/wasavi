export enum UMEnum {
  UND = "UND",
  KG = "KG",
  LT = "LT",
}

export const getFullUM = (
  amount: number,
  um: UMEnum,
  showAmount: boolean = true
): string => {
  switch (um) {
    case UMEnum.UND:
      return amount === 1
        ? `${showAmount ? amount : ""} Unidad (Und.)`
        : `${showAmount ? amount : ""} Unidades (Und.)`;
    case UMEnum.KG:
      return amount === 1
        ? `${showAmount ? amount : ""} Kilogramo (Kg.)`
        : `${showAmount ? amount : ""} Kilogramos (Kg.)`;
    case UMEnum.LT:
      return amount === 1
        ? `${showAmount ? amount : ""} Litro (Lt.)`
        : `${showAmount ? amount : ""} Litros (Lt.)`;

    default:
      return "";
  }
};

// ------------------------------

export interface Alert {
  type: "success" | "error" | null;
  message: string | undefined;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  PEN = "PEN",
}

export interface Restaurant {
  id: string;
  name: string;
  currency: Currency;
}

export interface User {
  id: string;
  auth_id: string;
  name: string;
  restaurants: string[] | [];
}

export interface Validation {
  validated: boolean;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categories: {
    name: string;
  };
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
  categories: {
    name: string;
  };
  restaurant: string;
  um: UMEnum;
  waste: number;
  price: number;
  taxes_included: boolean;
}