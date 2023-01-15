import { NavLink } from "react-router-dom";

// Types
import { IconType } from "react-icons/lib";

// Icons
import { MdOutlineRamenDining } from "react-icons/md";
import { FaFish, FaUtensils } from "react-icons/fa";

interface Option {
  name: string;
  icon: IconType;
  path: string;
}

const options: Option[] = [
  {
    name: "Productos",
    icon: MdOutlineRamenDining,
    path: "/products",
  },
  {
    name: "Insumos",
    icon: FaFish,
    path: "/supplies",
  },
  {
    name: "Conversor",
    icon: FaUtensils,
    path: "/converter",
  },
];

export const AppMenu = () => {
  return (
    <nav className="w-full">
      {options.map((option, index) => {
        return (
          <NavLink
            className={({ isActive }) =>
              `flex items-center space-x-3 mb-1 py-2 px-4 rounded-md ${
                isActive ? "bg-emerald-500" : " hover:bg-gray-50"
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
