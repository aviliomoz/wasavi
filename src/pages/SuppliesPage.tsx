import { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { SuppliesHeader } from "../components/app/SuppliesHeader";
import { AppLayout } from "../components/app/AppLayout";
import { SuppliesCategories } from "../components/app/SuppliesCategories";
import { SuppliesList } from "../components/app/SuppliesList";
import { SupplyDetails } from "../components/app/SupplyDetails";
import { Board } from "../components/ui/Board";

const SuppliesPage: NextPage = () => {
  const router = useRouter();
  const { action } = router.query;

  return (
    <AppLayout>
      <SuppliesHeader />
      <section className="w-full flex space-x-4 px-4 pt-0 pb-4">
        <Board width="w-1/6" title="Filtros">
          <SuppliesCategories />
        </Board>
        <Board width="w-2/6" title="Lista de insumos" fullSize={true}>
          <SuppliesList />
        </Board>
        {action === "new" ? (
          <Board width="w-3/6" title="Nuevo insumo">
            <SupplyDetails />
          </Board>
        ) : action === "edit" ? (
          <Board width="w-3/6" title="Editar insumo">
            <SupplyDetails />
          </Board>
        ) : (
          <Board width="w-3/6" title="Detalles del insumo">
            <SupplyDetails />
          </Board>
        )}
      </section>
    </AppLayout>
  );
};

export default SuppliesPage;
