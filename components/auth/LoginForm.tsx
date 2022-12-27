import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// Utils
import { supabase } from "../../utils/supabase";
import { setAlert } from "../../utils/slices/alertSlice";
import { updateWasaviData } from "../../utils/auth";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

// Components
import AlertBox from "../ui/AlertBox";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.session()) {
      router.push("/home");
    }
  }, []);

  const { formData, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.email === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "login form",
          message: "El campo de email no puede estar vacío",
        })
      );

      return;
    }

    if (formData.password === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "login form",
          message: "El campo de contraseña no puede estar vacío",
        })
      );

      return;
    }

    setLoading(true);

    const { user, error } = await supabase.auth.signIn({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      dispatch(
        setAlert({
          type: "error",
          location: "login form",
          message: "Lo datos de inicio de sesión ingresados son incorrectos",
        })
      );
    }

    setLoading(false);

    if (user) {
      const { data: user_data, error } = await supabase
        .from("users")
        .select("id, name")
        .eq("auth_id", user.id)
        .single();

      if (user_data) {
        updateWasaviData({ user: user_data, restaurant: {} });
        router.push("/home");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <AlertBox />
    </form>
  );
};

export default LoginForm;
