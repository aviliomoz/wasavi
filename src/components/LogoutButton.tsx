"use client";

import { logout } from "../utils/auth";

export const LogoutButton = () => {
  return (
    <button
      onClick={() => logout()}
      className="border py-1 px-3 rounded-md bg-white text-sm"
    >
      Cerrar sesión
    </button>
  );
};
