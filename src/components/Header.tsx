// import Link from "next/link";

// // Types
// import type { LocalData } from "../types/interfaces";

// Utils
// import { getLocalData } from "../utils/localStorage";
// import { logout } from "../utils/auth";
import supabaseClient from "../supabase/server-client";

// // Icons
// import { BiUserCircle } from "react-icons/bi";
// import { FaStore } from "react-icons/fa";

// Components
import { Logo } from "./Logo";
// import { Dropdown } from "./Dropdown";

export async function Header() {
  const supabase = supabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <header className="flex justify-center">
        <Logo />
      </header>
    );
  }

  return (
    <header className="h-20 flex items-center justify-between gap-6">
      <Logo />
      {/* <div className="max-w-max flex items-center justify-end gap-2">
        {!user && !restaurant && (
          <Link href="/" className="border rounded-md px-3 py-1">
            Iniciar sesión
          </Link>
        )}
        {restaurant && <Dropdown icon={FaStore} text={restaurant.name} />}
        {user && (
          <Dropdown
            icon={BiUserCircle}
            text={user.name}
            actions={[{ name: "Cerrar sesión", method: logout }]}
          />
        )}
      </div> */}
    </header>
  );
}
