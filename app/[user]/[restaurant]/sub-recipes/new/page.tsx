import { SubrecipeForm } from "@/src/components/SubrecipeForm";
import Link from "next/link";

interface Props {
  params: {
    user: string;
    restaurant: string;
  };
}

export default function NewSubrecipePage({
  params: { user, restaurant },
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nueva sub receta</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/sub-recipes`}
        >
          Cancelar
        </Link>
      </div>
      <SubrecipeForm mode="create" user={user} restaurant={restaurant} />
    </>
  );
}
