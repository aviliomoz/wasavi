// Types
import { Validation } from "../interfaces";

export const validateLogin = async (email: string, password: string) => {
  if (email === "")
    return {
      validated: false,
      message: "El campo de email no puede estar vacío",
    };
  if (password === "")
    return {
      validated: false,
      message: "El campo de contraseña no puede estar vacío",
    };

  return { validated: true, message: "" };
};
