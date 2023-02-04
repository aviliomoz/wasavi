// Components
import { DownloadButton } from "../components/DownloadButton";
import { SuppliesTable } from "../components/supplies/SuppliesTable";
import { AddButton } from "../components/ui/AddButton";


export const SuppliesPage = () => {
  return (
    <>
      <section className="w-full mb-4 flex items-center justify-between">
        <div className="w-2/5 flex items-center justify-start">
          <h2 className="font-semibold text-xl">Gestión de insumos</h2>
        </div>
        <div className="w-3/5 flex items-center justify-end space-x-2">
          <AddButton path="/supplies/new" text="Nuevo insumo" />
          <DownloadButton />
        </div>
      </section>
      <section className="w-full">
        <SuppliesTable />
      </section>
    </>
  );
};
