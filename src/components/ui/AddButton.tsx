import { Link } from "react-router-dom";

// Icons
import { FaPlusCircle } from "react-icons/fa";

interface Props {
  path: string;
  text: string;
}

export const AddButton = ({ path, text }: Props) => {
  return (
    <Link
      to={path}
      className="bg-emerald-500 text-white font-normal text-sm px-12 py-1 flex items-center rounded-md space-x-2"
    >
      <i>
        <FaPlusCircle />
      </i>
      <span>{text}</span>
    </Link>
  );
};
