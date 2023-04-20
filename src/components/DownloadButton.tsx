"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-3 rounded-full py-1.5 px-4 bg-emerald-500 text-white"
    >
      <span>Descargar</span>
      {isOpen ? (
        <FaChevronUp className="text-xs" />
      ) : (
        <FaChevronDown className="text-xs" />
      )}
    </button>
  );
};
