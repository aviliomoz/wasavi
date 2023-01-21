import { Outlet } from "react-router-dom";

// Components
import { Categories } from "../components/Categories";
import { ItemsList } from "../components/ui/ItemsList";
import { DownloadButton } from "../components/DownloadButton";
import { AddButton } from "../components/ui/AddButton";
import { Board } from "../components/ui/Board";

export const SuppliesPage = () => {
  return (
    <>
      <header className="w-full mb-4 flex items-center justify-between">
        <section className="w-2/5 flex items-center justify-start">
          <h2 className="font-semibold text-xl">Gestión de insumos</h2>
        </section>
        <section className="w-3/5 flex items-center justify-end space-x-2">
          <AddButton path="/supplies/new" text="Nuevo insumo" />
          <DownloadButton />
        </section>
      </header>
      <section className="w-full flex space-x-4 pt-0 pb-4">
        <Board width="w-1/6" title="Filtros">
          <Categories type="supplies" />
        </Board>
        <Board width="w-2/6" title="Lista de insumos">
          <ItemsList type="supplies" />
        </Board>
        <Board width="w-3/6" title="Detalles del insumo">
          <Outlet />
        </Board>
      </section>
    </>
  );
};
