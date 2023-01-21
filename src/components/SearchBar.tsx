import { useState } from "react";

// Icons
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex items-center rounded-full bg-white px-6 py-2 border space-x-3">
      <FaSearch className="fill-gray-300" />
      <input
        type="text"
        className="w-full font-thin text-sm outline-none"
        placeholder="Buscar productos o insumos"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};
