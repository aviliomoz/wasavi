import { useState } from "react";
import { IconType } from "react-icons";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

interface Route {
  url: string;
  name: string;
}

interface Action {
  method: () => void;
  name: string;
}

interface Props {
  icon: IconType;
  text: string;
  routes?: Route[];
  actions?: Action[];
}

export const Dropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-center gap-1 relative cursor-pointer"
    >
      <props.icon className="text-emerald-500" />
      <span className="max-w-[40px] truncate">{props.text}</span>
      {isOpen ? <BiChevronUp /> : <BiChevronDown />}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 border p-2 rounded-md bg-white w-max flex flex-col">
          {props.routes?.map((route) => {
            return (
              <Link
                className="py-1 px-3 rounded-md hover:bg-gray-50 w-full text-right"
                key={route.name}
                to={route.url}
              >
                {route.name}
              </Link>
            );
          })}
          {props.actions?.map((action) => {
            return (
              <button
                className="py-1 px-3 rounded-md hover:bg-gray-50 w-full text-right"
                key={action.name}
                onClick={() => action.method()}
              >
                {action.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
