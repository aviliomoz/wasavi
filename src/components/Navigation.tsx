"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  { name: "Recetas", path: "/" },
  { name: "Conversor", path: "/converter" },
];

export const Navigation = () => {
  let pathname = usePathname();

  return (
    <nav className="flex items-center gap-5">
      {routes.map((route, index) => {
        return (
          <Link className={`${route.path === pathname && "font-semibold"}`} href={route.path} key={index}>
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
};
