import { useState } from "react";

// Icons
import { FaSearch } from "react-icons/fa";

// Utils
import { getTargetValue, TargetEnum } from "../../utils/enums";

interface Props {
  target: TargetEnum;
}

export const SearchBar = ({ target }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex items-center rounded-md overflow-hidden bg-white px-4 py-1 shadow-sm">
      <FaSearch className="fill-gray-400" />
      <input
        type="text"
        className="form-input px-3 py-0 w-full font-normal text-sm border-none focus:ring-0"
        placeholder={`Buscar ${getTargetValue(target)}`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};
