import { useSetRecoilState } from "recoil";
import { useState } from "react";

// Utils
import { supabase } from "../../supabase";
import { alertState } from "../../recoil/alert";

// Hooks
import { useForm } from "../../utils/hooks/useForm";

const ResetForm = () => {
  const { formData, handleInputChange } = useForm({
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const setAlert = useSetRecoilState(alertState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password === "") {
      setAlert({
        type: "error",
        message: "El campo de nueva contraseña no puede estar vacío",
      });

      return;
    }

    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setAlert({
        type: "error",
        message: "Ocurrió un error al resetear la contraseña",
      });
    }

    if (user) {
      setAlert({
        type: "success",
        message: `Se actualizó la contraseña exitosamente`,
      });

      setTimeout(() => {
        location.assign("/home");
      }, 1000);
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
    </form>
  );
};

export default ResetForm;
