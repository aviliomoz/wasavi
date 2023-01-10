import { Currency } from "../interfaces";

export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case Currency.USD:
      return "$";
    case Currency.EUR:
      return "€";
    case Currency.PEN:
      return "S/";

    default:
      return "$";
  }
};
