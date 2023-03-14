import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSupply, getSupplyById } from "../utils/elements";
import { getLocalData } from "../utils/localStorage";

export const SuppliesEditor = () => {
  const { id } = useParams();
  const { restaurant } = getLocalData();

  const [name, setName] = useState<string>("");
  const [um, setUm] = useState<string>("KG");
  const [waste, setWaste] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [taxes_included, setTaxesIncluded] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id && id !== "new") {
      getSupplyById(id).then((supply) => {
        setName(supply.name);
        setPrice(supply.price);
        setUm(supply.um);
        setWaste(supply.waste);
        setTaxesIncluded(supply.taxes_included);
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id === "new" && restaurant)
      return createSupply({
        name,
        price,
        um,
        waste,
        taxes_included,
        restaurant: restaurant.id,
      }).then(() => {
        document.location.assign("/supplies/1");
      });

    setLoading(false);
  };

  return (
    <section>
      <h2 className="mb-6 font-bold text-lg">
        {id && id === "new" ? "Nuevo insumo" : "Edición de insumo"}
      </h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="flex items-center">
          <strong>Nombre: </strong>
          <input
            className="border ml-4 rounded-md py-1 px-3 w-full"
            type="text"
            value={name}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
          />
        </label>
        <label className="flex items-center">
          <strong>Precio: </strong>
          <span className="ml-4">S/</span>
          <input
            className="border ml-2 rounded-md py-1 px-3 w-full"
            type="number"
            value={price}
            min={0}
            step={0.5}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPrice(Number(e.currentTarget.value))
            }
          />
        </label>
        <label className="flex items-center">
          <strong>Merma: </strong>
          <span className="ml-4">%</span>
          <input
            className="border ml-2 rounded-md py-1 px-3 w-full"
            type="number"
            value={waste}
            min={0}
            max={100}
            step={0.5}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setWaste(Number(e.currentTarget.value))
            }
          />
        </label>
        <label className="flex items-center">
          <strong>Unidad de medida: </strong>
          <select
            defaultValue={um}
            className="border ml-2 rounded-md py-1.5 px-3 w-full"
            onChange={(e) => setUm(e.target.selectedOptions[0].value)}
          >
            <option value="UND">Unidad</option>
            <option value="KG">Kilogramo</option>
            <option value="LT">Litro</option>
          </select>
        </label>
        <label className="flex items-center">
          <strong>Afecto a impuestos: </strong>
          <input
            className="ml-4"
            type="checkbox"
            checked={taxes_included}
            onChange={(e) => setTaxesIncluded(e.target.checked)}
          />
        </label>
        <button
          className="py-1 px-3 rounded-md mt-6 bg-emerald-500 text-white"
          type="submit"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};
