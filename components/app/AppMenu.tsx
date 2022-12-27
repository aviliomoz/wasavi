import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons/lib";

// Icons
import { MdOutlineRamenDining } from "react-icons/md";
import { FaFish } from "react-icons/fa";

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
];

export const AppMenu = () => {
  const router = useRouter();

  return (
    <menu className="w-full">
      {options.map((option, index) => {
        return (
          <Link
            className={`flex items-center space-x-3 mb-1 py-2 px-4 rounded-md ${
              router.pathname.includes(option.path)
                ? "bg-emerald-500 text-white"
                : "hover:bg-gray-50"
            }`}
            href={option.path}
            key={index}
          >
            <i>
              {
                <option.icon
                  className={`${
                    router.pathname.includes(option.path)
                      ? "fill-white"
                      : "fill-emerald-400"
                  }`}
                />
              }
            </i>
            <span>{option.name}</span>
          </Link>
        );
      })}
    </menu>
  );
};
