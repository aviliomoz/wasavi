import { useState } from "react";

// Icons
import { FaSearch } from "react-icons/fa";

interface Props {
  type: "supplies" | "products";
}

const getPlaceHolder = (type: string) => {
  if (type === "supplies") return "Buscar insumo";
  if (type === "products") return "Buscar producto";
};

export const SearchBar = ({ type }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex items-center rounded-md overflow-hidden bg-white px-4 py-1 shadow-sm">
      <FaSearch className="fill-gray-400" />
      <input
        type="text"
        className="form-input px-3 py-0 w-full font-normal text-sm border-none focus:ring-0"
        placeholder={getPlaceHolder(type)}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};
