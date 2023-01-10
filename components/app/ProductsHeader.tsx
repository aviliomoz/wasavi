import { ProductsSearchBar } from "./ProductsSearchBar";

// Components
import { UserPill } from "./UserPill";
import { RestaurantPill } from "./RestaurantPill";
import { DownloadButton } from "./DownloadButton";
import { AddProductButton } from "./AddProductButton";

export const ProductsHeader = () => {
  return (
    <header className="w-full p-4 flex items-center justify-between">
      <section className="w-2/5 flex items-center justify-start">
        <ProductsSearchBar />
      </section>
      <section className="w-3/5 flex items-center justify-end space-x-2">
        <AddProductButton />
        <DownloadButton />
        <RestaurantPill />
        <UserPill />
      </section>
    </header>
  );
};
