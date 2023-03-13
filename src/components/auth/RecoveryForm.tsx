import { useState } from "react";
import { Link } from "react-router-dom";
import { recovery } from "../../utils/auth";

export const RecoveryForm = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await recovery(email);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-max flex flex-col items-center justify-center"
    >
      <h2 className="mb-4 font-bold text-xl">Recuperar contraseña</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 mb-5">
        Se enviará un correo con un enlace de recuperación
      </p>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border py-2 px-4 bg-white outline-none w-full"
      />

      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
      >
        {loading ? "Validando datos..." : "Enviar correo"}
      </button>
      <Link
        to={"/login"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>Regresar al inicio de sesión</span>
      </Link>
    </form>
  );
};
