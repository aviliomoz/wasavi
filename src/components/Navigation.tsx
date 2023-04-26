"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSuppliesStore } from "../stores/suppliesStore";
import { useProductsStore } from "../stores/productsStore";

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
  const { supplies } = useSuppliesStore();
  const { products } = useProductsStore();

  if (
    supplies.filter((supply) => supply.status).length === 0 ||
    products.filter((product) => product.status).length === 0
  ) {
    return (
      <Link
        className={`${routes[0].path === pathname && "font-semibold"}`}
        href={routes[0].path}
      >
        {routes[0].name}
      </Link>
    );
  }

  return (
    <nav className="flex items-center gap-5">
      {routes.map((route, index) => {
        return (
          <Link
            className={`${route.path === pathname && "font-semibold"}`}
            href={route.path}
            key={index}
          >
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
};
