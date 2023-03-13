import { Link } from "react-router-dom";
import { Restaurant } from "../types/interfaces";
import { updateRestaurant } from "../utils/localStorage";

interface Props {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link
      className="w-full border border-gray-200 rounded-md p-6 font-medium flex space-x-4 mb-2 items-center"
      onClick={() => updateRestaurant(restaurant)}
      to="/products/1"
    >
      <i className="w-3 h-3 rounded-full bg-emerald-500"></i>
      <p>{restaurant.name}</p>
    </Link>
  );
};
