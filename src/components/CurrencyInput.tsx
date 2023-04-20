"use client";

import { useRestaurantStore } from "../stores/restaurantStore";

export const CurrencyInput = () => {
  const { currency, setCurrency } = useRestaurantStore();

  return (
    <label className="flex items-center gap-2">
      <strong className="font-medium">Moneda:</strong>
      <input
        className="rounded-full border py-1.5 px-4 bg-gray-50 outline-none w-14"
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
    </label>
  );
};
