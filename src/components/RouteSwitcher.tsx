import { NavLink } from "react-router-dom";

interface Route {
  name: string;
  url: string;
}

const routes: Route[] = [
  { name: "Productos", url: "/products/1" },
  { name: "Insumos", url: "/supplies/1" },
];

export const RouteSwitcher = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-md flex ">
      {routes.map((route, index) => {
        return (
          <NavLink
            key={index}
            className={({ isActive }) => {
              return isActive
                ? "bg-white p-2 w-1/2 rounded-md text-center font-medium"
                : "p-2 w-1/2 text-center";
            }}
            to={route.url}
          >
            {route.name}
          </NavLink>
        );
      })}
    </div>
  );
};
