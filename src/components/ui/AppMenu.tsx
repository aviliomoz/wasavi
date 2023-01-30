import { NavLink } from "react-router-dom";

// Types
import { IconType } from "react-icons/lib";

// Icons
import {
  MdOutlineRamenDining,
  MdOutlineShoppingBag,
  MdOutlineInventory,
  MdOutlineRiceBowl,
  MdOutlinePayments
} from "react-icons/md";

interface MenuOption {
  name: string;
  icon: IconType;
  path: string;
}

const menu: MenuOption[] = [
  {
    name: "Productos",
    icon: MdOutlineRamenDining,
    path: "/products",
  },
  {
    name: "Insumos",
    icon: MdOutlineRiceBowl,
    path: "/supplies",
  },
  {
    name: "Compras",
    icon: MdOutlineShoppingBag,
    path: "/purchases",
  },
  {
    name: "Pagos",
    icon: MdOutlinePayments,
    path: "/payments",
  },
  {
    name: "Almacén",
    icon: MdOutlineInventory,
    path: "/stock",
  },
];

export const AppMenu = () => {
  return (
    <nav className="w-full">
      {menu.map((option, index) => {
        return (
          <NavLink
            className={({ isActive }) =>
              `flex items-center space-x-3 mb-1 py-2 px-4 rounded-sm ${
                isActive ? "bg-emerald-500" : "hover:bg-gray-50"
              }`
            }
            to={option.path}
            key={index}
          >
            {({ isActive }) => (
              <>
                <option.icon
                  className={isActive ? "fill-white" : "fill-emerald-500"}
                />
                <span className={isActive ? "text-white" : ""}>
                  {option.name}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
