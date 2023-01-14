import { useLocalData } from "../../hooks/useLocalData";
import { Link } from "react-router-dom";
import { useRestaurant } from "../../hooks/useRestaurant";

interface Props {
  id: string;
}

export const RestaurantCard = ({ id }: Props) => {
  const { updateLocalData } = useLocalData();
  const { restaurant } = useRestaurant(id);

  return (
    <Link
      className="border border-gray-200 rounded-md p-6 font-medium flex space-x-4 mb-2 items-center"
      onClick={() => updateLocalData({ restaurant: restaurant?.id })}
      to="/products"
    >
      <i className="w-3 h-3 rounded-full bg-emerald-500"></i>
      <p>{restaurant?.name}</p>
    </Link>
  );
};
