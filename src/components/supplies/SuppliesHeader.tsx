// Components
import { UserPill } from "./UserPill";
import { SuppliesSearchBar } from "./SuppliesSearchBar";
import { RestaurantPill } from "./RestaurantPill";
import { DownloadButton } from "./DownloadButton";
import { AddSupplyButton } from "./supplies/AddSupplyButton";

export const SuppliesHeader = () => {
  return (
    <header className="w-full p-4 flex items-center justify-between">
      <section className="w-2/5 flex items-center justify-start">
        <SuppliesSearchBar />
      </section>
      <section className="w-3/5 flex items-center justify-end space-x-2">
        <AddSupplyButton />
        <DownloadButton />
        <RestaurantPill />
        <UserPill />
      </section>
    </header>
  );
};
