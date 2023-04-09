import { ProductForm } from "@/src/components/ProductForm";
import Link from "next/link";

interface Props {
  params: { id: string; user: string; restaurant: string };
}

export default function ProductEditorPage({
  params: { id, user, restaurant },
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Editar producto</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/products`}
        >
          Cancelar
        </Link>
      </div>
      <ProductForm
        mode="edit"
        user={user}
        restaurant={restaurant}
        product_id={id}
      />
    </>
  );
}
