import { SupplyForm } from "@/src/components/SupplyForm";
import Link from "next/link";

interface Props {
  params: {
    user: string;
    restaurant: string;
  };
}

export default function NewSupplyPage({ params: { user, restaurant } }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nuevo insumo</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/supplies`}
        >
          Cancelar
        </Link>
      </div>
      <SupplyForm mode="create" user={user} restaurant={restaurant}/>
    </>
  );
}
