"use client";

import { useRestaurantStore } from "../stores/restaurantStore";

export const TaxesInput = () => {
  const { taxes, setTaxes } = useRestaurantStore();

  return (
    <label className="flex items-center gap-2">
      <strong className="font-medium">Impuestos: %</strong>
      <input
        className="rounded-full border py-1.5 px-4 bg-gray-50 outline-none w-20"
        type="number"
        min={0}
        max={99}
        step={1}
        value={taxes}
        onChange={(e) => setTaxes(Number(e.target.value))}
      />
    </label>
  );
};
