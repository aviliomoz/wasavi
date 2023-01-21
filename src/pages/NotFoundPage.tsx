import { Logo } from "../components/ui/Logo";

export const NotFoundPage = () => {
  return (
    <div className="w-full h-screen py-10 px-24">
      <header className="w-full h-1/6">
        <Logo />
      </header>
      <div className="w-full h-5/6 flex flex-col items-center">
        <h2 className="font-black text-9xl">404</h2>
        <h4 className="font-semibold text-xl mb-4">Página no encontrada</h4>
        <p className="font-light">
          La página web a la que estas tratando de acceder no existe
        </p>
        <a
          className="bg-emerald-500 text-white py-3 px-6 mt-8 rounded-sm text-lg"
          href="/"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};
