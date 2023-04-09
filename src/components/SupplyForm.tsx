"use client";

import { useState, useEffect } from "react";
import {
  createSupply,
  getSupplyById,
  togleSupply,
  updateSupply,
} from "../utils/supplies";
import { useRouter } from "next/navigation";

interface Props {
  mode: "create" | "edit";
  user: string;
  restaurant: string;
  supply_id?: string;
}

const ums = [
  { name: "Kilogramos", uuid: "d3c03fe4-bf98-453d-b5fc-f1fedbefb2c4" },
  { name: "Litros", uuid: "76b03634-a0fc-49f5-9038-d2dfe7f942bb" },
  { name: "Unidades", uuid: "fd8a5d39-3b00-4b6a-aec3-a8227428760a" },
];

export const SupplyForm = ({ mode, user, restaurant, supply_id }: Props) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [um, setUm] = useState<string>("d3c03fe4-bf98-453d-b5fc-f1fedbefb2c4");
  const [price, setPrice] = useState<string>("0");
  const [waste, setWaste] = useState<string>("0");
  const [taxes_included, setTaxesIncluded] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && supply_id) {
      getSupplyById(supply_id).then((supply) => {
        if (supply) {
          setName(supply.name);
          setUm(supply.um);
          setPrice(supply.price.toString());
          setWaste(supply.waste.toString());
          setTaxesIncluded(supply.taxes_included);
          setStatus(supply.status);
        }

        setLoading(false);
      });
    }

    if (mode === "create") setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    if (mode === "create") {
      await createSupply({
        name,
        price: Number(price),
        um,
        waste: Number(waste),
        taxes_included,
        restaurant,
      });
    }

    if (mode === "edit" && supply_id) {
      await updateSupply(
        {
          name,
          price: Number(price),
          um,
          waste: Number(waste),
          taxes_included,
          restaurant,
        },
        supply_id
      );
    }

    setSaving(false);
    router.push(`/${user}/${restaurant}/supplies`);
  };

  const handleToggleState = async () => {
    const action = status ? "anular" : "activar";

    const confirmation = confirm(`¿Seguro que quieres ${action} este insumo?`);

    if (confirmation && supply_id) {
      await togleSupply(supply_id, !status);
      router.push(`/${user}/${restaurant}/supplies`);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-2">
      <label className="flex items-center gap-2">
        <strong>Nombre:</strong>
        <input
          className="border rounded-md px-3 py-1 w-full"
          type="text"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
      </label>
      <label className="flex items-center gap-2">
        <strong className="min-w-max">Unidad de medida:</strong>
        <select
          className="border bg-white py-1 px-3 rounded-md w-full"
          defaultValue={um}
          onChange={(e: React.FormEvent<HTMLSelectElement>) =>
            setUm(e.currentTarget.value)
          }
        >
          {ums.map((um) => {
            return (
              <option key={um.uuid} value={um.uuid}>
                {um.name}
              </option>
            );
          })}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <strong className="min-w-max">Precio de compra:</strong>
        <input
          className="border rounded-md px-3 py-1 w-full"
          type="number"
          min={0}
          value={price}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPrice(e.currentTarget.value)
          }
        />
      </label>
      <label className="flex items-center gap-2">
        <strong className="min-w-max">Porcentaje de merma:</strong>
        <strong>%</strong>
        <input
          className="border rounded-md px-3 py-1 w-full"
          type="number"
          min={0}
          value={waste}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setWaste(e.currentTarget.value)
          }
        />
      </label>
      <label className="flex items-center gap-2">
        <strong className="min-w-max">Afecto a impuestos:</strong>
        <input
          className="ml-3"
          type="checkbox"
          checked={taxes_included}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTaxesIncluded(e.currentTarget.checked)
          }
        />
      </label>
      <div className="flex items-center gap-2">
        {mode === "edit" && status && supply_id && (
          <button
            type="button"
            onClick={() => handleToggleState()}
            className="text-red-500 font-medium rounded-md py-2 px-4 mt-6"
          >
            Anular
          </button>
        )}
        {mode === "edit" && !status && supply_id && (
          <button
            type="button"
            onClick={() => handleToggleState()}
            className=" text-emerald-500 font-medium rounded-md py-2 px-4 mt-6"
          >
            Activar
          </button>
        )}
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white font-medium rounded-md p-2 mt-6"
        >
          {saving ? "Guardando" : "Guardar insumo"}
        </button>
      </div>
    </form>
  );
};
