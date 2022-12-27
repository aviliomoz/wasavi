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

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.session()) {
      router.push("/home");
    }
  }, []);

  const { formData, handleInputChange } = useForm({
    name: "",
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
          location: "signup form",
          message: "El campo de email no puede estar vacío",
        })
      );

      return;
    }

    if (formData.password === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "signup form",
          message: "El campo de contraseña no puede estar vacío",
        })
      );

      return;
    }

    if (formData.name === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "signup form",
          message: "El campo de nombre no puede estar vacío",
        })
      );

      return;
    }

    setLoading(true);

    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      dispatch(
        setAlert({
          type: "error",
          location: "signup form",
          message: "Ocurrió un error en el registro",
        })
      );
    }

    setLoading(false);

    if (user) {
      const { data, error } = await supabase
        .from("users")
        .insert([{ auth_id: user.id, name: formData.name }])
        .single();

      if (error)
        dispatch(
          setAlert({
            type: "error",
            location: "signup form",
            message: "Ocurrió un error en el registro",
          })
        );

      if (data) {
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 text-center font-bold text-xl">Registro</h2>
      <input
        type="text"
        autoComplete="off"
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="rounded-md border-[1px] py-2 px-4 mb-2 bg-white outline-none w-full"
      />
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
      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
        disabled={loading}
      >
        {loading ? "Registrando datos..." : "Crear cuenta"}
      </button>
      <Link
        href={"/auth/login"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿Ya tienes cuenta? - </span>
        <strong>Inicia sesión</strong>
      </Link>
      <AlertBox />
    </form>
  );
};

export default SignupForm;
