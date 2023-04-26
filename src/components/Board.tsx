"use client";

import { useState } from "react";

// Icons
import { FaPlus } from "react-icons/fa";

// Types
import { Target, Element } from "../utils/types";

// Stores
import { useRestaurantStore } from "../stores/restaurantStore";
import { useModeStore } from "../stores/modeStore";
import { useActiveStore } from "../stores/activeStore";
import { useCalc } from "../hooks/useCalc";

interface Props {
  target: Target;
  title: string;
  elements: Element[];
  creator: React.ReactNode;
  editor: React.ReactNode;
}

export const Board = ({ target, title, elements, creator, editor }: Props) => {
  const mode = useModeStore();
  const active = useActiveStore();
  const { currency } = useRestaurantStore();
  const { calculateCost } = useCalc();
  const [search, setSearch] = useState<string>("");

  const handleSelectElement = (element: Element) => {
    mode.setShowMode(target, "edit");
    active.setActive(target, element);
  };

  return (
    <div className="bg-white rounded-md p-6 h-min border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">{title}</h2>
        {mode[target] !== "default" ? (
          <button
            onClick={() => mode.setShowMode(target, "default")}
            className="flex items-center text-sm gap-2 py-1 px-3 rounded-full"
          >
            <span>Cancelar</span>
          </button>
        ) : (
          <button
            onClick={() => mode.setShowMode(target, "create")}
            className="flex items-center text-sm gap-2 bg-emerald-500 text-white py-1 px-3 rounded-full"
          >
            <FaPlus className="text-xs" />
            <span>Nuevo</span>
          </button>
        )}
      </div>
      {mode[target] === "default" && (
        <>
          {elements &&
          elements.filter((element) => element.status).length > 0 ? (
            <>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Buscar ${title.toLowerCase()}`}
                className="border w-full py-1 px-4 rounded-full outline-none"
              />
              <div className="text-sm font-semibold flex items-center justify-between px-10 my-4">
                <span>Nombre</span>
                <span>Costo</span>
              </div>
            </>
          ) : (
            <p className="my-8 text-center text-gray-400">Vacio</p>
          )}
          <ul className="flex flex-col gap-1">
            {elements &&
              elements.filter((element) => element.status).length > 0 &&
              elements
                .filter((element) => element.status)
                .filter((element) =>
                  element.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((element) => {
                  return (
                    <li key={element.id} className="">
                      <button
                        onClick={() => handleSelectElement(element)}
                        className="w-full flex justify-between pr-8 py-0.5 pl-2 border border-transparent hover:border-gray-100 hover:font-medium rounded-lg hover:bg-gray-50"
                      >
                        <span>{element.name}</span>
                        <span>
                          {currency}{" "}
                          {calculateCost(target, element.id).toFixed(2)}
                        </span>
                      </button>
                    </li>
                  );
                })}
          </ul>
        </>
      )}
      {mode[target] === "create" && creator}
      {mode[target] === "edit" && editor}
    </div>
  );
};
