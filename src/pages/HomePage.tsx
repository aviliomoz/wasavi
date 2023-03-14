import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { RestaurantCard } from "../components/RestaurantCard";
import { Restaurant } from "../types/interfaces";
import { getLocalData, updateRestaurant } from "../utils/localStorage";
import { getRestaurantsByUser } from "../utils/restaurants";

export const HomePage = () => {
  updateRestaurant(undefined);
  const { user } = getLocalData();
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);

  useEffect(() => {
    user && getRestaurantsByUser(user.id).then(setRestaurants);
  }, [user]);

  if (restaurants === null)
    return (
      <div className="w-full flex justify-center mt-20">
        <Loading />
      </div>
    );

  return (
    <section className="px-4">
      <h2 className="text-center mb-6 mt-20 font-semibold text-lg">
        Selecciona un restaurante:
      </h2>
      {restaurants.length === 0 && (
        <p className="text-center">Todavía no gestionas ningun restaurante</p>
      )}
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
      })}
    </section>
  );
};
