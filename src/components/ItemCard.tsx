import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";

interface Props {
  id: string;
  name: string;
  target: "products" | "supplies";
}

export const ItemCard = ({ id, name, target }: Props) => {
  return (
    <div className="group flex items-center justify-between px-3 py-2 hover:bg-gray-50 mb-2 rounded-md">
      <Link to={`/${target}/editor/${id}`} className="group-hover:font-medium">
        {name}
      </Link>
      <div className="flex gap-4 items-center text-xl text-opacity-20 group-hover:text-opacity-100 text-black">
        <Link to={`/${target}/editor/${id}`}>
          <MdEdit />
        </Link>
        <button>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
