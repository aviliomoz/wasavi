"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "../../../src/utils/auth";

export default function SignupForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    await signup(name, email, password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="mb-6 font-bold text-lg">Registro</h2>
      <input
        type="text"
        autoComplete="off"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md border py-2 px-4 mb-2 bg-white outline-none w-full"
      />
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
      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
        disabled={loading}
      >
        {loading ? "Registrando datos..." : "Crear cuenta"}
      </button>
      <Link
        href={"/login"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿Ya tienes cuenta? - </span>
        <strong>Inicia sesión</strong>
      </Link>
    </form>
  );
}
