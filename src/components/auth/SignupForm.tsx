import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

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
      <h2 className="mb-8 text-center font-bold text-2xl">Registro</h2>
      <input
        type="text"
        autoComplete="off"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md border border-gray-300 py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-gray-300 py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <input
        type="password"
        autoComplete="off"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md border border-gray-300 py-2 px-4 mb-2 bg-white outline-none w-full"
      />
      <button
        type="submit"
        className="my-6 bg-emerald-500 py-2 text-white font-bold rounded-md w-full"
        disabled={loading}
      >
        {loading ? "Registrando datos..." : "Crear cuenta"}
      </button>
      <Link
        to={"/login"}
        className="text-sm text-gray-500 hover:font-medium mt-2 cursor-pointer"
      >
        <span>¿Ya tienes cuenta? - </span>
        <strong>Inicia sesión</strong>
      </Link>
    </form>
  );
};
