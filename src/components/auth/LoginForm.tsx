import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 h-max flex flex-col items-center justify-center"
    >
      <h2 className="mb-8 font-bold text-2xl">Inicio de sesión</h2>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-sm border border-gray-300 py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <input
        type="password"
        autoComplete="off"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-sm border border-gray-300 py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <Link
        to={"/recovery"}
        className="text-sm text-gray-400 hover:font-medium mt-4 cursor-pointer"
      >
        Recuperar contraseña
      </Link>
      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-sm w-full"
      >
        {loading ? "Validando datos..." : "Entrar"}
      </button>
      <Link
        to={"/signup"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿No tienes cuenta? - </span>
        <strong>Regístrate</strong>
      </Link>
    </form>
  );
};
