import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const ResetForm = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { reset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await reset(password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-8 font-bold text-2xl">Resetear contraseña</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 mb-5">
        Ingresa una nueva contraseña para iniciar sesión en tu cuenta
      </p>
      <input
        type="password"
        autoComplete="off"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md border border-gray-300 py-2 px-4 bg-white outline-none w-full"
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
