import { useEffect, useState } from "react";
import { useLocalData } from "../../hooks/useLocalData";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantsList = () => {
  const { getLocalData } = useLocalData();
  const [restaurants, setRestaurants] = useState<string[] | []>([]);

  useEffect(() => {
    setRestaurants(getLocalData().restaurants);
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-center font-bold text-2xl">Restaurantes</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 my-6">
        Selecciona un restaurante para comenzar a gestionar sus recetas
      </p>
      <div className="">
        {restaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant} id={restaurant} />;
        })}
      </div>
    </div>
  );
};
