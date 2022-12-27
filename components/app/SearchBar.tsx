import { useState } from "react";

// Icons
import { FaSearch } from "react-icons/fa";

// Utils
import { getTargetValue, Target } from "../../utils/enums";

interface Props {
  target: Target;
}

export const SearchBar = ({ target }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex items-center rounded-md overflow-hidden bg-white px-4 py-1 shadow-sm">
      <FaSearch className="fill-gray-400" />
      <input
        className="outline-none px-3 w-full font-normal text-sm"
        type="text"
        placeholder={`Buscar ${getTargetValue(target)}`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};
