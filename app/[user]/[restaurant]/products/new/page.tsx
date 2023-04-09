import { ProductForm } from "@/src/components/ProductForm";
import Link from "next/link";

interface Props {
  params: {
    user: string;
    restaurant: string;
  };
}

export default function NewProductPage({ params: { user, restaurant } }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nuevo producto</h2>
        <Link
          className="text-gray-500"
          href={`/${user}/${restaurant}/products`}
        >
          Cancelar
        </Link>
      </div>
      <ProductForm mode="create" user={user} restaurant={restaurant}/>
    </>
  );
}