import { useEffect, useState } from "react";

// Icons
import {
  FaStore,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaExchangeAlt,
} from "react-icons/fa";
import { supabase } from "../../supabase";
import { getLocalData } from "../../functions/local";
import { Restaurant } from "../../types/interfaces";

type Props = {
  showName?: boolean;
};

export const RestaurantPill = ({ showName = true }: Props) => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const data = getLocalData().restaurant;

    setRestaurant(data);
  }, []);

  const handleLoguot = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      document.location.assign("/");
    }
  };

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