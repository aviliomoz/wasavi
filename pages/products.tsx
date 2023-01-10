import { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { ProductsHeader } from "../components/app/ProductsHeader";
import { AppLayout } from "../components/app/AppLayout";
import { ProductsCategories } from "../components/app/ProductsCategories";
import { ProductsList } from "../components/app/ProductsList";
import { ProductDetails } from "../components/app/ProductDetails";
import { Board } from "../components/ui/Board";

const ProductsPage: NextPage = () => {
  const router = useRouter();
  const { action } = router.query;

  return (
    <AppLayout>
      <ProductsHeader />
      <section className="w-full flex space-x-4 px-4 pt-0 pb-4">
        <Board width="w-1/6" title="Filtros">
          <ProductsCategories />
        </Board>
        <Board width="w-2/6" title="Lista de productos" fullSize={true}>
          <ProductsList />
        </Board>
        {action === "new" ? (
          <Board width="w-3/6" title="Nuevo producto">
            <ProductDetails />
          </Board>
        ) : action === "edit" ? (
          <Board width="w-3/6" title="Editar producto">
            <ProductDetails />
          </Board>
        ) : (
          <Board width="w-3/6" title="Detalles del producto">
            <ProductDetails />
          </Board>
        )}
      </section>
    </AppLayout>
  );
};

export default ProductsPage;
