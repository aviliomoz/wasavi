import { supabase } from "../supabase/browser-client";
import { validateLogin, validateRecovery, validateSignup } from "./validators";

export const getUsername = async (id: string): Promise<string> => {
  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("auth_id", id)
    .single();
  if (error) throw Error("Error al cargar datos de usuario");
  return data.name;
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw Error("Error al cerrar la sesión");

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

    return document.location.assign(`/${user.id}`);
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

    return document.location.assign(`/${user.id}`);
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
