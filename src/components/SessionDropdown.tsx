"use client";

import { useState } from "react";

// // Icons
import { BiUserCircle, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { logout } from "../utils/auth";

interface Props {
  user: string;
  restaurant?: string;
}

export const SessionDropdown = ({ user, restaurant = undefined }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={toggleDropdown}
      className="bg-white rounded-md py-1 px-3 border flex items-center justify-end relative"
    >
      {restaurant && (
        <p className="flex items-center gap-1">
          <FaStore />
          <span className="border-r pr-3 mr-3 max-w-[100px] truncate">
            Tayanti
          </span>
        </p>
      )}
      <p className="flex items-center gap-1">
        <BiUserCircle />
        <span className="hidden sm:block max-w-[80px] sm:max-w-[160px] truncate">
          {user}
        </span>
        {isOpen ? <BiChevronUp /> : <BiChevronDown />}
      </p>
      {isOpen && (
        <ul className="absolute top-full mt-2 right-0 bg-white border rounded py-2 px-4">
          <li>
            <button className="min-w-max" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
