import { supabase } from "../services/supabase";
import { validateLogin, validateRecovery, validateSignup } from "./validators";
import { cleanLocalData, updateUser } from "./localStorage";

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw Error("Error al cargar la sesión del usuario");

  return session;
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw Error("Error al cerrar la sesión");

    cleanLocalData();
    return document.location.assign("/login");
  } catch (error) {
    alert(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const validation = validateLogin(email, password);

    if (!validation.ok) {
      throw Error(validation.message);
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (!user) throw new Error("Los datos ingresados son inválidos");
    if (error) throw new Error("Error al iniciar sesión");

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    updateUser(data);
    return document.location.assign("/home");
  } catch (error) {
    alert(error);
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const validation = validateSignup(name, email, password);

    if (!validation.ok) {
      throw Error(validation.message);
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error || !user)
      throw Error("Ha ocurrido un error al registrar el usuario");

    const { error: insertError } = await supabase
      .from("users")
      .insert({ name, auth_id: user.id });

    if (insertError) throw Error("Error al registrar los datos del usuario");

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    updateUser(data);
    return document.location.assign("/home");
  } catch (error) {
    alert(error);
  }
};

export const recovery = async (email: string) => {
  try {
    const validation = validateRecovery(email);

    if (!validation.ok) {
      throw Error(validation.message);
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error || !data)
      throw Error("Ha ocurrido un error al enviar el correo de recuperación");

    alert(`Se ha enviado un correo de recuperación a: ${email}`);
  } catch (error) {
    alert(error);
  }
};
