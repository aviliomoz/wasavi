import { NextPage } from "next";

// Components
import { AppHeader } from "../components/app/AppHeader";
import { AppLayout } from "../components/app/AppLayout";
import { ListCategories } from "../components/app/ListCategories";
import { ListItems } from "../components/app/ListItems";
import { SupplyDetails } from "../components/app/SupplyDetails";
import { Board } from "../components/ui/Board";

// Types
import { TargetEnum } from "../utils/enums";

const SuppliesPage: NextPage = () => {
  return (
    <AppLayout>
      <AppHeader target={TargetEnum.SUPPLIES} />
      <section className="w-full flex space-x-4 px-4 pt-0 pb-4">
        <Board width="w-1/6" title="Filtros">
          <ListCategories target={TargetEnum.SUPPLIES} />
        </Board>
        <Board width="w-2/6" title="Lista de insumos" fullSize={true}>
          <ListItems target={TargetEnum.SUPPLIES} />
        </Board>
        <Board width="w-3/6" title="Detalles del insumo">
          <SupplyDetails />
        </Board>
      </section>
    </AppLayout>
  );
};

export default SuppliesPage;
