// Types
import { Validation } from "../types/interfaces";

export const useValidator = () => {
  const validateLogin = (email: string, password: string): Validation => {
    if (email === "")
      return {
        validated: false,
        message: "El campo del email no puede estar vacío",
      };
    if (password === "")
      return {
        validated: false,
        message: "El campo de la contraseña no puede estar vacío",
      };

    return { validated: true, message: "" };
  };

  const validateSignup = (
    name: string,
    email: string,
    password: string
  ): Validation => {
    if (name === "")
      return {
        validated: false,
        message: "El campo del nombre no puede estar vacío",
      };
    if (email === "")
      return {
        validated: false,
        message: "El campo del email no puede estar vacío",
      };
    if (password === "")
      return {
        validated: false,
        message: "El campo de la contraseña no puede estar vacío",
      };

    return { validated: true, message: "" };
  };

  const validateRecovery = (email: string): Validation => {
    if (email === "")
      return {
        validated: false,
        message: "El campo del email no puede estar vacío",
      };

    return { validated: true, message: "" };
  };

  const validateReset = (password: string): Validation => {
    if (password === "")
      return {
        validated: false,
        message: "El campo de la contraseña no puede estar vacío",
      };

    return { validated: true, message: "" };
  };

  return { validateLogin, validateSignup, validateRecovery, validateReset };
};
