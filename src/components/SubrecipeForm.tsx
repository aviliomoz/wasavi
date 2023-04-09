"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  createSubrecipe,
  getSubrecipeById,
  togleSubrecipe,
  updateSubrecipe,
} from "../utils/sub-recipes";
import { useRouter } from "next/navigation";
import { RecipeForm } from "./RecipeForm";

interface Props {
  mode: "create" | "edit";
  user: string;
  restaurant: string;
  subrecipe_id?: string;
}

const ums = [
  { name: "Kilogramos", uuid: "d3c03fe4-bf98-453d-b5fc-f1fedbefb2c4" },
  { name: "Litros", uuid: "76b03634-a0fc-49f5-9038-d2dfe7f942bb" },
  { name: "Unidades", uuid: "fd8a5d39-3b00-4b6a-aec3-a8227428760a" },
];

export const SubrecipeForm = ({
  mode,
  user,
  restaurant,
  subrecipe_id,
}: Props) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [um, setUm] = useState<string>("d3c03fe4-bf98-453d-b5fc-f1fedbefb2c4");
  const [amount, setAmount] = useState<string>("0");
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && subrecipe_id) {
      getSubrecipeById(subrecipe_id).then((subrecipe) => {
        if (subrecipe) {
          setName(subrecipe.name);
          setUm(subrecipe.um);
          setAmount(subrecipe.amount.toString());
          setStatus(subrecipe.status);
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
      await createSubrecipe({
        name,
        amount: Number(amount),
        um,
        restaurant,
      });
    }

    if (mode === "edit" && subrecipe_id) {
      await updateSubrecipe(
        {
          name,
          amount: Number(amount),
          um,
          restaurant,
        },
        subrecipe_id
      );
    }

    setSaving(false);
    router.push(`/${user}/${restaurant}/sub-recipes`);
  };

  const handleToggleState = async () => {
    const action = status ? "anular" : "activar";

    const confirmation = confirm(
      `¿Seguro que quieres ${action} esta sub receta?`
    );

    if (confirmation && subrecipe_id) {
      await togleSubrecipe(subrecipe_id, !status);
      router.push(`/${user}/${restaurant}/sub-recipes`);
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
        <strong className="min-w-max">Cantidad:</strong>
        <input
          className="border rounded-md px-3 py-1 w-full"
          type="number"
          min={0}
          value={amount}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setAmount(e.currentTarget.value)
          }
        />
      </label>

      <RecipeForm />

      <div className="flex items-center gap-2">
        {mode === "edit" && status && subrecipe_id && (
          <button
            type="button"
            onClick={() => handleToggleState()}
            className="text-red-500 font-medium rounded-md py-2 px-4 mt-6"
          >
            Anular
          </button>
        )}
        {mode === "edit" && !status && subrecipe_id && (
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
          {saving ? "Guardando" : "Guardar sub receta"}
        </button>
      </div>
    </form>
  );
};
