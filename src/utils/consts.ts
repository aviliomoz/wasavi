import { Data } from "./types";

export const dataname = "wasavi_data";
export const ums = ["kg", "Lt", "Und"];

export const initialData: Data = {
  restaurant: "Sin nombre",
  currency: "$",
  taxes: 18,
  products: [],
  subproducts: [],
  supplies: [],
  ums,
};
