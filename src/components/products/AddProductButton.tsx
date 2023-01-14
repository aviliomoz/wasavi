import { useRouter } from "next/router";

// Icons
import { FaPlusCircle } from "react-icons/fa";

export const AddProductButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${router.pathname}?action=new`);
  };

  return (
    <button
      onClick={() => handleClick()}
      className="bg-emerald-500 text-white font-normal text-sm px-12 py-1 flex items-center rounded-md space-x-2"
    >
      <i>
        <FaPlusCircle />
      </i>
      <span>{`Nuevo producto`}</span>
    </button>
  );
};
