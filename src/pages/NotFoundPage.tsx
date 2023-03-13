import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="w-full mt-20 px-4 flex flex-col items-center text-center">
      <h2 className="font-black text-6xl">404</h2>
      <h4 className="font-semibold text-lg mb-4">Página no encontrada</h4>
      <p className="font-light">
        La página web a la que estas tratando de acceder no existe
      </p>
      <Link
        className="bg-emerald-500 text-white py-2 px-4 mt-8 rounded-md"
        to="/"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
