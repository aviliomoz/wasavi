import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Utils
import { supabase } from "../../utils/supabase";
import { setAlert } from "../../utils/slices/alertSlice";
import { updateWasaviData } from "../../utils/auth";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

// Components
import AlertBox from "../ui/AlertBox";

const ResetForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!supabase.auth.session()) {
      router.push("/auth/login");
    }
  }, []);

  const { formData, handleInputChange } = useForm({
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password === "") {
      dispatch(
        setAlert({
          type: "error",
          location: "reset form",
          message: "El campo de nueva contraseña no puede estar vacío",
        })
      );

      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.update({
      password: formData.password,
    });

    if (error) {
      dispatch(
        setAlert({
          type: "error",
          location: "reset form",
          message: "Ocurrió un error al resetear la contraseña",
        })
      );
    }

    setLoading(false);

    if (data) {
      dispatch(
        setAlert({
          type: "success",
          location: "reset form",
          message: `Se actualizó la contraseña exitosamente`,
        })
      );

      const { data: user_data, error } = await supabase
        .from("users")
        .select("id, name")
        .eq("auth_id", supabase.auth.user()?.id)
        .single();

      if (user_data) {
        updateWasaviData({ user: user_data, restaurant: {} });
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 font-bold text-xl">Resetear contraseña</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 mb-5">
        Ingresa una nueva contraseña para iniciar sesión en tu cuenta
      </p>
      <input
        type="password"
        autoComplete="off"
        placeholder="Nueva contraseña"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="rounded-md border-[1px] py-2 px-4 bg-white outline-none w-full"
      />

      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
      >
        {loading ? "Actualizando..." : "Guardar"}
      </button>

      <AlertBox />
    </form>
  );
};

export default ResetForm;
