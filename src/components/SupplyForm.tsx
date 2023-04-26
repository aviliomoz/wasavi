"use client";

import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";

// Types
import { Supply } from "@/src/utils/types";

// Consts
import { ums } from "../utils/consts";

// Stores
import { useSuppliesStore } from "../stores/suppliesStore";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useModeStore } from "../stores/modeStore";
import { useCalc } from "../hooks/useCalc";

interface Props {
  supply?: Supply;
}

export const SupplyForm = ({ supply }: Props) => {
  const { setShowMode } = useModeStore();
  const { updateSupply, createSupply, deleteSupply } = useSuppliesStore();
  const { currency, taxes } = useRestaurantStore();
  const { calculateSupplyCost } = useCalc();

  // Form elements
  const [name, setName] = useState<string>(supply?.name || "");
  const [um, setUm] = useState<string>(supply?.um || "Kg");
  const [price, setPrice] = useState<number>(supply?.price || 0);
  const [waste, setWaste] = useState<number>(supply?.waste || 0);
  const [taxes_included, setTaxesIncluded] = useState<boolean>(
    supply ? supply.taxes_included : true
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (supply) {
      updateSupply(supply.id, {
        id: supply.id,
        name,
        um,
        price,
        waste,
        taxes_included,
        status: supply.status,
      });
    }

    if (!supply) {
      createSupply({
        id: uuidv4(),
        name,
        um,
        price,
        waste,
        taxes_included,
        status: true,
      });
    }

    setShowMode("supplies", "default");
  };

  return (
    <>
      {!supply && <h3 className="font-semibold mb-6">Crear insumo:</h3>}
      {supply && <h3 className="font-semibold mb-6">Editar insumo:</h3>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="flex gap-2 items-center">
          <span>Nombre:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-2"
          />
        </label>
        <label className="flex gap-2 items-center">
          <span>Unidad de medida:</span>
          <select
            value={um}
            onChange={(e) => setUm(e.target.value)}
            className="border rounded-md px-1"
          >
            {ums.map((um) => {
              return (
                <option key={um} value={um}>
                  {um}
                </option>
              );
            })}
          </select>
        </label>
        <label className="flex gap-2 items-center">
          <span>Precio de compra:</span>
          <span>{currency}</span>
          <input
            type="number"
            value={price}
            min={0}
            step={0.1}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-24 border rounded-md px-2"
          />
        </label>
        <label className="flex gap-2 items-center">
          <span>Merma:</span>
          <span>%</span>
          <input
            type="number"
            value={waste}
            min={0}
            max={99}
            step={1}
            onChange={(e) => setWaste(Number(e.target.value))}
            className="w-16 border rounded-md px-2"
          />
        </label>
        <label className="flex gap-2 items-center">
          <span>Incluye impuestos:</span>
          <input
            type="checkbox"
            checked={taxes_included}
            onChange={(e) => setTaxesIncluded(e.target.checked)}
            className="w-16 border rounded-md px-2"
          />
        </label>
        <label className="flex gap-2 items-center">
          <span>Costo final:</span>
          <span>{currency}</span>
          <input
            type="number"
            value={calculateSupplyCost(
              price,
              taxes_included,
              taxes,
              waste
            ).toFixed(2)}
            disabled
            className="w-24 border rounded-md px-2"
          />
        </label>
        <div className="flex items-center gap-2 justify-center mt-6">
          {supply && (
            <button
              onClick={() => deleteSupply(supply.id)}
              className="border rounded-full px-3 w-32 py-1"
            >
              Eliminar
            </button>
          )}
          <button
            type="submit"
            className="bg-emerald-500 rounded-full px-3 text-white w-32 py-1"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
