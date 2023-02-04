import { UM } from "../types/interfaces";

export const getFullUM = (um: UM) => {
  switch (um) {
    case "KG":
      return "Kilogramos";
    case "LT":
      return "Litros";
    case "UND":
      return "Unidad";
    default:
      return "-";
  }
};
