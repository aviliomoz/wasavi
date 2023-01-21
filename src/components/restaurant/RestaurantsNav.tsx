import { useLocation } from "react-router-dom";

import { useLocalData } from "../../hooks/useLocalData";
import { useRestaurant } from "../../hooks/useRestaurant";
import { useRestaurants } from "../../hooks/useRestaurants";

export const RestaurantsNav = () => {
  const { restaurants, loading } = useRestaurants();

  if (loading) return <></>;

  return (
    <div>
      {restaurants.map((restaurant) => {
        return <RestaurantLink key={restaurant} id={restaurant} />;
      })}
    </div>
  );
};

const RestaurantLink = ({ id }: { id: string }) => {
  const location = useLocation();
  const { restaurant, loading } = useRestaurant(id);
  const { updateRestaurant, restaurant: current } = useLocalData();

  if (!restaurant || loading) return <></>;

  return (
    <a
      href={location.pathname}
      onClick={() => {
        updateRestaurant(restaurant);
      }}
      className={`flex w-full items-center space-x-3 mb-1 py-2 px-4 rounded-sm ${
        restaurant.id === current?.id ? "bg-emerald-500 text-white" : ""
      }`}
    >
      <i
        className={`w-2 h-2 rounded-full ${
          restaurant.id === current?.id ? "bg-white" : "bg-emerald-500"
        }`}
      ></i>
      <p>{restaurant.name}</p>
    </a>
  );
};
