import { SearchBar } from "./SearchBar";

// Types
import { Target } from "../../utils/enums";

// Components
import { UserPill } from "./UserPill";
import { RestaurantPill } from "./RestaurantPill";
import { DownloadButton } from "./DownloadButton";
import { AddButton } from "./AddButton";

interface Props {
  target: Target;
}

export const AppHeader = ({ target }: Props) => {
  return (
    <header className="w-full p-4 flex items-center justify-between">
      <section className="w-2/5 flex items-center justify-start">
        <SearchBar target={target} />
      </section>
      <section className="w-3/5 flex items-center justify-end space-x-2">
        <AddButton target={target} />
        <DownloadButton />
        <RestaurantPill />
        <UserPill />
      </section>
    </header>
  );
};
