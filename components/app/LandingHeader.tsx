import Link from "next/link";
import { useEffect, useState } from "react";

// Utils
import { supabase } from "../../utils/supabase";

// Icons
import { FaChevronDown } from "react-icons/fa";

// Components
import Logo from "../ui/Logo";

export const LandingHeader = () => {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (supabase.auth.session()) {
      setLogged(true);
    } else {
      setLogged(false);
    }

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
        {loading ? null : logged ? (
          <Link
            href={"/home"}
            className="bg-emerald-500 text-white py-2 px-4 rounded-md"
          >
            Entrar a la App
          </Link>
        ) : (
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href={"/auth/login"}>Iniciar sesión</Link>
            </li>
            <li>
              <Link
                href={"/auth/signup"}
                className="bg-emerald-500 text-white py-2 px-4 rounded-md"
              >
                Registrarse
              </Link>
            </li>
          </ul>
        )}
      </section>
    </header>
  );
};
