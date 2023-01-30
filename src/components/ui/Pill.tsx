import { useState } from "react";

// Icons
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Types
import { IconType } from "react-icons/lib";

interface Option {
  name: string;
  icon: IconType;
  action: () => void;
}

interface Props {
  showName?: boolean;
  info: {
    name: string;
    icon: IconType;
  };
  options: Option[];
}

export const Pill = ({ showName = true, info, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="relative bg-white text-sm rounded-sm flex space-x-2 items-center"
    >
      <info.icon className="fill-emerald-500" />
      {showName && <p className="max-w-[100px] truncate">{info.name}</p>}
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      {isOpen && options.length > 0 && (
        <ul className="z-10 text-sm absolute top-[calc(100%+10px)] right-0 bg-white p-2 rounded-md border">
          {options.map((option, index) => {
            return (
              <li
                key={index}
                onClick={() => option.action()}
                className={
                  "hover:bg-gray-50 min-w-max px-2 py-1 flex items-center space-x-2 justify-end"
                }
              >
                <option.icon />
                <p>{option.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </button>
  );
};
