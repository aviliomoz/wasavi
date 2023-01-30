import { Outlet } from "react-router-dom";

// Components
import { Logo } from "./Logo";
import { AppMenu } from "./AppMenu";

// Icons
import { UserPill } from "./UserPill";
import { RestaurantPill } from "./RestaurantPill";

export const AppLayout = () => {
  return (
    <div className="w-full min-h-screen flex relative pt-14 pl-52">
      <header className="fixed top-0 left-0 w-full h-14 flex bg-white z-20 border-b justify-between">
        <div className="w-52 h-full flex items-center justify-center">
          <Logo />
        </div>
        <div className="h-full flex items-center pr-12 space-x-8">
          <RestaurantPill />
          <UserPill />
        </div>
      </header>
      <menu className="fixed left-0 w-52 h-[calc(100vh-56px)] p-4 flex flex-col border-r bg-white z-20">
        <AppMenu />
      </menu>
      <section className="w-full min-h-[calc(100vh-56px)] p-4 relative bg-gray-50">
        <Outlet />
      </section>
    </div>
  );
};
