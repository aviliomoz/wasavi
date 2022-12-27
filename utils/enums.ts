// export enum AuthEnum {
//   LOGIN = "LOGIN",
//   SIGNUP = "SIGNUP",
//   RECOVERY = "RECOVERY",
// }

export enum TargetEnum {
  PRODUCTS = "PRODUCTS",
  SUPPLIES = "SUPPLIES",
}

export const getTargetValue = (target: TargetEnum) => {
  switch (target) {
    case TargetEnum.PRODUCTS:
      return "producto";
    case TargetEnum.SUPPLIES:
      return "insumo";
  }
};

export enum CurrencyEnum {
  PEN = "PEN",
  USD = "USD",
  EUR = "EUR",
}

export const getCurrencySymbol = (
  price: number,
  currency: CurrencyEnum
): string => {
  switch (currency) {
    case CurrencyEnum.PEN:
      return `S/. ${price}`;
    case CurrencyEnum.USD:
      return `$ ${price}`;
    case CurrencyEnum.USD:
      return `€ ${price}`;

    default:
      return "";
  }
};

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
        ? `${showAmount ? amount : ""} unidad (Und.)`
        : `${showAmount ? amount : ""} unidades (Und.)`;
    case UMEnum.KG:
      return amount === 1
        ? `${showAmount ? amount : ""} kilogramo (Kg.)`
        : `${showAmount ? amount : ""} kilogramos (Kg.)`;
    case UMEnum.LT:
      return amount === 1
        ? `${showAmount ? amount : ""} litro (Lt.)`
        : `${showAmount ? amount : ""} litros (Lt.)`;

    default:
      return "";
  }
};
