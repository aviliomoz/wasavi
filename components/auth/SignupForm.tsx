import { useSetRecoilState } from "recoil";
import { useState } from "react";
import Link from "next/link";

// Utils
import { supabase } from "../../supabase";
import { alertState } from "../../recoil/alert";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

const SignupForm = () => {
  const { formData, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const setAlert = useSetRecoilState(alertState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.email === "") {
      setAlert({
        type: "error",
        message: "El campo de email no puede estar vacío",
      });

      return;
    }

    if (formData.password === "") {
      setAlert({
        type: "error",
        message: "El campo de contraseña no puede estar vacío",
      });

      return;
    }

    if (formData.name === "") {
      setAlert({
        type: "error",
        message: "El campo de nombre no puede estar vacío",
      });

      return;
    }

    setLoading(true);

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setAlert({
        type: "error",
        message: "Ocurrió un error en el registro",
      });
    }

    if (user) {
      const { error } = await supabase
        .from("users")
        .insert([{ auth_id: user.id, name: formData.name }])
        .single();

      if (error)
        setAlert({
          type: "error",
          message: "Ocurrió un error en el registro",
        });
    }

    if (session) {
      location.assign("/home");
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
    </form>
  );
};

export default SignupForm;
