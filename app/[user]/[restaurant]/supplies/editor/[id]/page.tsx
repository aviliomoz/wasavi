import { SupplyForm } from "@/src/components/SupplyForm";
import Link from "next/link";

interface Props {
  params: { id: string; user: string; restaurant: string };
}

export default function SupplyEditorPage({
  params: { id, user, restaurant },
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Editar insumo</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/supplies`}
        >
          Cancelar
        </Link>
      </div>
      <SupplyForm
        mode="edit"
        user={user}
        restaurant={restaurant}
        supply_id={id}
      />
    </>
  );
}
