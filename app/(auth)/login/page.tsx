"use client";

import { useState } from "react";
import Link from "next/link";

// Utils
import { login } from "../../../src/utils/auth";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 font-bold text-lg">Inicio de sesión</h2>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <input
        type="password"
        autoComplete="off"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md border py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <Link
        href={"/recovery"}
        className="text-sm text-gray-400 hover:font-medium mt-4 cursor-pointer"
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
        href={"/signup"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿No tienes cuenta? - </span>
        <strong>Regístrate</strong>
      </Link>
    </form>
  );
}
