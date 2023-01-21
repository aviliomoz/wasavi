import { Outlet } from "react-router-dom";

// Components
import { Logo } from "./Logo";
import { AppMenu } from "./AppMenu";
import { SearchBar } from "../SearchBar";
import { UserPill } from "./UserPill";
import { RestaurantsNav } from "../restaurant/RestaurantsNav";

export const AppLayout = () => {
  return (
    <div className="w-full min-h-screen flex relative pt-16 pl-56">
      <header className="fixed top-0 left-0 w-full h-16 flex bg-white z-20">
        <div className="w-56 h-full flex items-center justify-center border-r border-b">
          <Logo />
        </div>
        <div className="w-[calc(100%-464px)] h-full flex items-center px-14 border-b border-r">
          <SearchBar />
        </div>
        <div className="w-60 h-full flex items-center justify-center border-b">
          <UserPill />
        </div>
      </header>
      <menu className="fixed left-0 w-56 h-full py-6 px-4 flex flex-col border-r bg-white z-20">
        <h3 className="text-xs mb-2 text-gray-600">MENU</h3>
        <AppMenu />
        <hr className="mt-3 mb-6" />
        <h3 className="text-xs mb-2 text-gray-600">RESTAURANTES</h3>
        <RestaurantsNav />
      </menu>
      <section className="w-full min-h-full p-4 relative bg-gray-50">
        <Outlet />
      </section>
    </div>
  );
};
