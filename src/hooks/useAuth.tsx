import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

// Services
import { supabase } from "../services/supabase";

// Contexts
import { alertState } from "../contexts/alertState";
import { useValidator } from "./useValidator";
import { useLocalData } from "./useLocalData";

export const useAuth = () => {
  const navigate = useNavigate();
  const { clearLocalData } = useLocalData();

  const setAlert = useSetRecoilState(alertState);
  const { validateLogin, validateSignup, validateRecovery, validateReset } =
    useValidator();

  const login = async (email: string, password: string) => {
    const { validated, message } = validateLogin(email, password);

    if (!validated) {
      return setAlert({
        type: "error",
        message,
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data) {
      return setAlert({
        type: "error",
        message: "Lo datos de inicio de sesión ingresados son incorrectos",
      });
    }

    navigate("/home");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return setAlert({
        type: "error",
        message: "Ha ocurrido un error al intentar cerrar la sesión",
      });
    }

    clearLocalData();
    navigate("/");
  };

  const signup = async (name: string, email: string, password: string) => {
    const { validated, message } = validateSignup(name, email, password);

    if (!validated) {
      return setAlert({
        type: "error",
        message,
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data || !data.user) {
      return setAlert({
        type: "error",
        message: "Ocurrió un error en el registro",
      });
    } else {
      const { error } = await supabase
        .from("users")
        .insert({ name, auth_id: data.user.id });

      if (error) {
        return setAlert({
          type: "error",
          message: "Ocurrió un error en el registro",
        });
      }
    }

    navigate("/home");
  };

  const recovery = async (email: string) => {
    const { validated, message } = validateRecovery(email);

    if (!validated) {
      return setAlert({
        type: "error",
        message,
      });
    }

    let { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error || !data) {
      setAlert({
        type: "error",
        message: "Ocurrió un error al verificar el correo",
      });
    }

    return setAlert({
      type: "success",
      message: `Se acaba de enviar un enlace de recuperación al correo: ${email}`,
    });
  };

  const reset = async (password: string) => {
    const { validated, message } = validateReset(password);

    if (!validated) {
      return setAlert({
        type: "error",
        message,
      });
    }

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error || !data) {
      setAlert({
        type: "error",
        message: "Ocurrió un error al resetear la contraseña",
      });
    }

    setAlert({
      type: "success",
      message: `Se actualizó la contraseña exitosamente`,
    });

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return { login, logout, signup, recovery, reset };
};
