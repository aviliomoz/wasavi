import { UM } from "../types/interfaces";

export const getFullUM = (um: UM) => {
  switch (um) {
    case "KG":
      return "Kilogramo (Kg.)";
    case "LT":
      return "Litro (Lt.)";
    case "UND":
      return "Unidad (Und.)";
    default:
      return "-";
  }
};
