import { Currency } from "../types/interfaces";

export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case "EUR":
      return "€";
    case "PEN":
      return "S/";
    default:
      return "$";
  }
};
