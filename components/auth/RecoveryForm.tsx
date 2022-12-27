import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// Utils
import { supabase } from "../../utils/supabase";
import { setAlert } from "../../utils/slices/alertSlice";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

// Components
import AlertBox from "../ui/AlertBox";

const RecoveryForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.session()) {
      router.push("/home");
    }
  }, []);

  const { formData, handleInputChange } = useForm({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.email === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "recovery form",
          message: "El campo de email no puede estar vacío",
        })
      );

      return;
    }

    setLoading(true);

    let { data, error } = await supabase.auth.api.resetPasswordForEmail(
      formData.email
    );

    if (error) {
      dispatch(
        setAlert({
          type: "error",
          location: "recovery form",
          message: "Ocurrió un error al verificar el correo",
        })
      );
    }

    if (data) {
      dispatch(
        setAlert({
          type: "success",
          location: "recovery form",
          message: `Se acaba de enviar un enlace de recuperación al correo: ${formData.email}`,
        })
      );
    }

    setLoading(false);
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
      <AlertBox />
    </form>
  );
};

export default RecoveryForm;
