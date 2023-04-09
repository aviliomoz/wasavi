"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  user: string;
  restaurant: string;
}

interface Route {
  name: string;
  url: string;
}

const routes: Route[] = [
  { name: "Productos", url: "/products" },
  { name: "Sub recetas", url: "/sub-recipes" },
  { name: "Insumos", url: "/supplies" },
];

export const RouteSwitcher = ({ user, restaurant }: Props) => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 p-2 rounded-md flex gap-2 min-w-[320px]">
      {routes.map((route, index) => {
        return (
          <Link
            key={index}
            className={`p-2 w-1/2 rounded-md text-center text-sm flex items-center justify-center bg-white ${
              pathname?.includes(route.url.slice(0, -1))
                ? "bg-opacity-100 font-semibold"
                : "hover:bg-opacity-50 bg-opacity-0"
            }`}
            href={`/${user}/${restaurant}${route.url}`}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};
