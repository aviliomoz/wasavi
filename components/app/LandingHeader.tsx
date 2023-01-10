import Link from "next/link";
import { useEffect, useState } from "react";

// Utils
import { supabase } from "../../supabase";

// Icons
import { FaChevronDown } from "react-icons/fa";

// Components
import Logo from "../ui/Logo";

export const LandingHeader = () => {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setLogged(false);
      } else {
        setLogged(true);
      }
    });

    setLoading(false);
  }, []);

  return (
    <header className="w-full py-6 px-20 flex items-center justify-between relative">
      <section className="flex space-x-10 items-center">
        <Logo />
        <button className="flex items-center space-x-2">
          <span>Características</span>
          <FaChevronDown />
        </button>
      </section>
      <section>
        {loading ? (
          <></>
        ) : logged ? (
          <Link
            href={"/home"}
            className="bg-emerald-500 text-white py-2 px-4 rounded-md"
          >
            Entrar a la App
          </Link>
        ) : (
          <div className="flex space-x-6 items-center">
            <Link href={"/auth/login"}>Iniciar sesión</Link>
            <Link
              href={"/auth/signup"}
              className="bg-emerald-500 text-white py-2 px-4 rounded-md"
            >
              Registrarse
            </Link>
          </div>
        )}
      </section>
    </header>
  );
};
