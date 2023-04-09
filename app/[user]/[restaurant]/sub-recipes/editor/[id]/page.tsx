import { SubrecipeForm } from "@/src/components/SubrecipeForm";
import Link from "next/link";

interface Props {
  params: { id: string; user: string; restaurant: string };
}

export default function SubrecipeEditorPage({
  params: { id, user, restaurant },
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Editar sub receta</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/sub-recipes`}
        >
          Cancelar
        </Link>
      </div>
      <SubrecipeForm
        mode="edit"
        user={user}
        restaurant={restaurant}
        subrecipe_id={id}
      />
    </>
  );
}
