// Components
import { AppLayout } from "../components/ui/AppLayout";
import { Categories } from "../components/Categories";
import { ItemsList } from "../components/ItemsList";
import { DownloadButton } from "../components/DownloadButton";
import { RestaurantPill } from "../components/ui/RestaurantPill";
import { AddButton } from "../components/AddButton";
import { SearchBar } from "../components/SearchBar";
import { Board } from "../components/ui/Board";
import { UserPill } from "../components/ui/UserPill";
import { Outlet } from "react-router-dom";

export const ProductsPage = () => {
  return (
    <AppLayout>
      <header className="w-full p-4 flex items-center justify-between">
        <section className="w-2/5 flex items-center justify-start">
          <SearchBar type="products" />
        </section>
        <section className="w-3/5 flex items-center justify-end space-x-2">
          <AddButton path="/products/new" text="Nuevo producto" />
          <DownloadButton />
          <RestaurantPill />
          <UserPill />
        </section>
      </header>
      <section className="w-full flex space-x-4 px-4 pt-0 pb-4">
        <Board width="w-1/6" title="Filtros">
          <Categories type="products" />
        </Board>
        <Board width="w-2/6" title="Lista de productos" fullSize={true}>
          <ItemsList type="products" />
        </Board>
        <Board width="w-3/6" title="Detalles del producto">
          <Outlet />
        </Board>
      </section>
    </AppLayout>
  );
};
