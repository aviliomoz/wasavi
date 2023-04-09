"use client";

import { useEffect, useState } from "react";

// // Icons
import { BiUserCircle, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { getUsername, logout } from "../utils/auth";
import { getRestaurantName } from "../utils/restaurants";

interface Props {
  user: string;
  restaurant: string;
}

export const SessionDropdown = ({ user, restaurant }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [resname, setResname] = useState("");

  useEffect(() => {
    getUsername(user).then(setUsername)
  }, [])

  useEffect(() => {
    getRestaurantName(restaurant).then(setResname)
  }, [])

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
            {resname}
          </span>
        </p>
      )}
      <p className="flex items-center gap-1">
        <BiUserCircle />
        <span className="hidden sm:block max-w-[80px] sm:max-w-[160px] truncate">
          {username}
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
