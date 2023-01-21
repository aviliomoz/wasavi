import { useRestaurants } from "../../hooks/useRestaurants";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantsList = () => {
  const { restaurants, loading } = useRestaurants();

  if (loading) return <></>;

  return (
    <div className="w-4/6 h-max">
      <h2 className="text-center font-bold text-2xl">Restaurantes</h2>
      <p className="text-center font-light text-sm px-6 text-gray-500 my-6">
        Selecciona un restaurante para comenzar a gestionar sus recetas
      </p>
      <div className="flex space-x-4 justify-center">
        {restaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant} id={restaurant} />;
        })}
      </div>
    </div>
  );
};
