import { Link } from "react-router-dom";

import { MdEdit, MdDelete } from "react-icons/md";
import { deleteSupply } from "../utils/supplies";

interface Props {
  id: string;
  name: string;
  target: "products" | "supplies";
}

export const ItemCard = ({ id, name, target }: Props) => {
  const handleDelete = () => {
    const confirmation = confirm(
      "¿Seguro que quieres eliminar el siguiente elemento?: " + name
    );

    if (confirmation) {
      if (target === "supplies") {
        deleteSupply(id).then(() => location.reload());
      }

      if (target === "products") {
        // Funcion para borrar producto
      }
    }
  };

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
          <MdDelete onClick={handleDelete} />
        </button>
      </div>
    </div>
  );
};
