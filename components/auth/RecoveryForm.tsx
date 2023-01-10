import { useSetRecoilState } from "recoil";
import { useState } from "react";
import Link from "next/link";

// Utils
import { supabase } from "../../supabase";
import { alertState } from "../../recoil/alert";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

const RecoveryForm = () => {
  const { formData, handleInputChange } = useForm({
    email: "",
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

    setLoading(true);

    let { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email
    );

    setLoading(false);

    if (error) {
      setAlert({
        type: "error",
        message: "Ocurrió un error al verificar el correo",
      });
    }

    if (data) {
      setAlert({
        type: "success",
        message: `Se acaba de enviar un enlace de recuperación al correo: ${formData.email}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 font-bold text-xl">Recuperar contraseña</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 mb-5">
        Se enviará a tu correo un enlace con un token de recuperación
      </p>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="rounded-md border-[1px] py-2 px-4 bg-white outline-none w-full"
      />

      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
      >
        {loading ? "Validando datos..." : "Enviar correo"}
      </button>
      <Link
        href={"/auth/login"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>Regresar al inicio de sesión</span>
      </Link>
    </form>
  );
};

export default RecoveryForm;
