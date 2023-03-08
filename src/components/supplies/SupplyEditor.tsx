import { useParams, Link } from "react-router-dom";

// Components
import { IncludedBox } from "./IncludedBox";

// Hooks
import { useLocalData } from "../../hooks/useLocalData";
import { useSupply } from "../../hooks/useSupply";

// Functions
import { getCurrencySymbol } from "../../functions/getCurrencySymbol";
import { getFullUM } from "../../functions/getfullUM";
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";

export const SupplyEditor = () => {
  const { id } = useParams();
  const { restaurant } = useLocalData();
  const { categories } = useCategories("supplies");
  const { supply, loading } = useSupply(id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [um, setUm] = useState("KG");
  const [price, setPrice] = useState(0);
  const [waste, setWaste] = useState(0);
  const [taxes_included, setTaxes] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (supply) {
      setName(supply.name);
      setCategory(supply.category);
      setUm(getFullUM(supply.um));
      setPrice(supply.price);
      setWaste(supply.waste);
      setTaxes(supply.taxes_included);
      setIsActive(supply.status);
    }
  }, [supply]);

  const handleUpdate = () => {
    console.log({
      name,
      category,
      um,
      price,
      waste,
      taxes_included,
      isActive,
      id
    });
  };

  if (loading || !supply || !id || !restaurant || !categories) {
    return <span>Cargando...</span>;
  }

  return (
    <>
      <section className="w-full mb-4 flex items-center justify-between">
        <div className="w-2/5 flex items-center justify-start">
          <h2 className="font-semibold text-xl">Gestión de insumos</h2>
        </div>
        <div className="w-3/5 flex items-center justify-end space-x-2">
          <Link to={"/supplies"}>Cancelar</Link>
          <button onClick={handleUpdate}>Actualizar</button>
        </div>
      </section>
      <div className="flex flex-col space-y-1 items-start">
        <label>
          <strong className="mr-2">Nombre: </strong>
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <strong className="mr-2">Categoría: </strong>
          <select
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <strong className="mr-2">Unidad de medida: </strong>
          {getFullUM(supply.um)}
        </label>
        <label>
          <strong className="mr-2">Precio de compra: </strong>
          {getCurrencySymbol(restaurant.currency)}
          {supply.price}
        </label>
        <label>
          <strong className="mr-2">Merma: </strong>
          {`${supply.waste}%`}
        </label>
        <label>
          <strong className="mr-2">Afecto a impuestos: </strong>
          {supply.taxes_included ? "Sí" : "No"}
        </label>

        <hr style={{ margin: "20px 0px", width: "100%" }} />
        <label>
          <strong className="mr-2">
            Presente en los siguientes productos:{" "}
          </strong>
        </label>
        <IncludedBox />
        <Link to={`/supplies/edit/${id}`}>Editar insumo</Link>
      </div>
    </>
  );
};
