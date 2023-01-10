import { useEffect, useState } from "react";
import { NextPage } from "next";

// Components

// Utils
import { getLocalData } from "../utils/functions/local";
import { RestaurantCard } from "../components/app/RestaurantCard";
import { UserPill } from "../components/app/UserPill";

const HomePage: NextPage = () => {
  const [restaurants, setRestaurants] = useState<string[]>([]);

  useEffect(() => {
    const user = getLocalData().user;

    if (user) {
      setRestaurants(user.restaurants);
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <UserPill />
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant} id={restaurant} />;
      })}
    </div>
  );
};

export default HomePage;
