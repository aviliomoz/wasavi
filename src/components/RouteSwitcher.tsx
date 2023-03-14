import { Link, useLocation } from "react-router-dom";

interface Route {
  name: string;
  url: string;
}

const routes: Route[] = [
  { name: "Productos", url: "/products/1" },
  { name: "Insumos", url: "/supplies/1" },
];

export const RouteSwitcher = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-100 p-2 rounded-md flex gap-2">
      {routes.map((route, index) => {
        return (
          <Link
            key={index}
            className={`p-2 w-1/2 rounded-md text-center ${
              pathname.includes(route.url.slice(0, -1))
                ? "bg-white font-medium"
                : "hover:bg-gray-50"
            }`}
            to={route.url}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};
