import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const RecoveryForm = () => {
  const [email, setEmail] = useState("");

  const { recovery, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await recovery(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-8 font-bold text-2xl">Recuperar contraseña</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 mb-5">
        Se enviará un correo con un enlace de recuperación
      </p>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-gray-300 py-2 px-4 bg-white outline-none w-full"
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
