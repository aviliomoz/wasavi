import { ElementsList } from "@/src/components/ElementsList";
import Link from "next/link";
import { FaPlusCircle, FaDownload } from "react-icons/fa";

interface Props {
  params: {
    user: string;
    restaurant: string;
  };
}

export default function SubrecipePage({ params: { user, restaurant } }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Sub recetas</h1>
        <div className="flex gap-2">
          <button className="border rounded-md px-3 py-1">
            <FaDownload />
          </button>
          <Link
            href={`/${user}/${restaurant}/sub-recipes/new`}
            className="rounded-md px-3 py-1 bg-emerald-500 text-white flex items-center gap-2"
          >
            <FaPlusCircle />
            <span className="max-w-[80px] truncate">Nueva sub receta</span>
          </Link>
        </div>
      </div>
      <ElementsList user={user} restaurant={restaurant} target="sub-recipes" />
    </>
  );
}