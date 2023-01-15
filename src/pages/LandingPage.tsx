import { useState, useEffect } from "react";

// Components
import { Outlet } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { Slider } from "../components/ui/Slider";
import { UserPill } from "../components/ui/UserPill";
import { useLocalData } from "../hooks/useLocalData";

export const LandingPage = () => {
  const { getLocalData } = useLocalData();
  const [user, setUser] = useState<string>();

  useEffect(() => {
    setUser(getLocalData().user);
  }, []);

  return (
    <div className="w-full h-screen py-10 px-24 flex">
      <section className="w-7/12 h-full flex flex-col">
        <header className="w-full flex">
          <Logo />
        </header>
        <div className="w-full h-full pt-6 pr-6 flex">
          <Slider />
        </div>
      </section>
      <section className="w-5/12 p-10 h-full flex items-center justify-center relative">
        {user && (
          <div className="absolute top-6 right-6">
            <UserPill id={user} />
          </div>
        )}
        <div className="w-11/12 p-12 h-full">
          <Outlet />
        </div>
      </section>
    </div>
  );
};
