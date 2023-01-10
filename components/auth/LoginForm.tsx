import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Link from "next/link";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

// Utils
import { validateLogin } from "../../utils/validators/auth";
import { alertState } from "../../recoil/alert";
import { supabase } from "../../supabase";
import { getUserData } from "../../utils/functions/auth";
import { setLocalData } from "../../utils/functions/local";

const LoginForm = () => {
  const { formData, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setAlert = useSetRecoilState(alertState);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { validated, message } = await validateLogin(
      formData.email,
      formData.password
    );

    if (!validated) {
      return setAlert({
        type: "error",
        message,
      });
    }

    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error || !user) {
      setLoading(false);

      return setAlert({
        type: "error",
        message: "Lo datos de inicio de sesión ingresados son incorrectos",
      });
    }

    const data = await getUserData(user);

    if (!data) {
      setLoading(false);

      return setAlert({
        type: "error",
        message: "Ocurrió un error al cargar los datos del usuario",
      });
    }

    setLoading(false);

    setLocalData({ user: data });
    location.assign("/home");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 font-bold text-xl">Inicio de sesión</h2>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="rounded-md border-[1px] py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <input
        type="password"
        autoComplete="off"
        placeholder="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="rounded-md border-[1px] py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <Link
        href={"/auth/password-recovery"}
        className="text-sm text-gray-400 hover:font-medium mt-2 cursor-pointer"
      >
        Recuperar contraseña
      </Link>
      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
      >
        {loading ? "Validando datos..." : "Entrar"}
      </button>
      <Link
        href={"/auth/signup"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿No tienes cuenta? - </span>
        <strong>Regístrate</strong>
      </Link>
    </form>
  );
};

export default LoginForm;
