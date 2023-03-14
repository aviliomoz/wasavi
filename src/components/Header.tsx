import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { getLocalData } from "../utils/localStorage";
import { useEffect, useState } from "react";
import { LocalData } from "../types/interfaces";

import { BiUserCircle } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { Dropdown } from "./Dropdown";
import { logout } from "../utils/auth";

export const Header = () => {
  const { pathname } = useLocation();
  const [{ user, restaurant }, setData] = useState<LocalData>({
    user: undefined,
    restaurant: undefined,
  });

  useEffect(() => {
    setData(getLocalData());
  }, [pathname]);

  return (
    <header className="h-20 flex items-center justify-between gap-6">
      <Logo />
      <div className="max-w-max flex items-center justify-end gap-2">
        {!user && !restaurant && (
          <Link to="/login" className="border rounded-md px-3 py-1">
            Iniciar sesión
          </Link>
        )}
        {restaurant && (
          <Dropdown
            icon={FaStore}
            text={restaurant.name}
          />
        )}
        {user && (
          <Dropdown
            icon={BiUserCircle}
            text={user.name}
            actions={[{ name: "Cerrar sesión", method: logout }]}
          />
        )}
      </div>
    </header>
  );
};
