import { Outlet, Link } from "react-router-dom";

// Components
import { Logo } from "../components/ui/Logo";
import { UserPill } from "../components/ui/UserPill";

// Hooks
import { useAuth } from "../hooks/useAuth";

export const LandingPage = () => {
  const { session } = useAuth();

  return (
    <div className="w-full min-h-screen h-screen px-24">
      <header className="w-full h-1/6 flex items-center justify-between">
        <Logo />
        <div>
          {!session ? (
            <div className="flex items-center space-x-6">
              <Link to="/login">Iniciar Sesión</Link>
              <Link
                to="/signup"
                className="bg-emerald-500 rounded-sm text-white font-medium py-2 px-6"
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <UserPill />
          )}
        </div>
      </header>
      <div className="w-full h-5/6 flex pt-16 justify-center">
        <Outlet />
      </div>
    </div>
  );
};
