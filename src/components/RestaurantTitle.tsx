"use client";

import { useRestaurantStore } from "../stores/restaurantStore";

export const RestaurantTitle = () => {
  const { restaurant, setRestaurantName } = useRestaurantStore();

  return (
    <label className="flex items-center gap-2">
      <strong className="font-medium">Restaurante:</strong>
      <input
        className="rounded-full border py-1.5 px-4 bg-gray-50 outline-none w-36"
        type="text"
        value={restaurant}
        onChange={(e) => setRestaurantName(e.target.value)}
      />
    </label>
  );
};
