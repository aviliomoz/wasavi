import { useEffect, useState } from "react";

// Icons
import {
  FaStore,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaExchangeAlt,
} from "react-icons/fa";

type Props = {
  showName?: boolean;
};

interface Restaurant {
  id: string;
  name: string;
  currency: string;
}

export const RestaurantPill = ({ showName = true }: Props) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRestaurant(
      JSON.parse(localStorage.getItem("wasavi_data") || "")?.restaurant
    );
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white py-1 px-3 text-sm font-normal rounded-md shadow-sm flex space-x-2 items-center"
      >
        <FaStore className="fill-emerald-500" />
        {restaurant && showName && (
          <p className="max-w-[100px] truncate">{restaurant.name}</p>
        )}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        {isOpen && (
          <ul className="z-10 text-sm absolute -bottom-20 right-0 bg-white p-2 rounded-md shadow-md">
            <li className="flex items-center justify-end space-x-2 hover:bg-gray-50 py-1 px-2 rounded-sm">
              <FaCog />
              <p className="min-w-max">Ajustes de restaurante</p>
            </li>
            <li className="flex items-center justify-end space-x-2 hover:bg-gray-50 py-1 px-2 rounded-sm">
              <FaExchangeAlt />
              <p className="min-w-max">Cambiar restaurante</p>
            </li>
          </ul>
        )}
      </button>
    </>
  );
};
