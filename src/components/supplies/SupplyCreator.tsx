import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { MdArrowBack } from "react-icons/md";

// Hooks
import { useLocalData } from "../../hooks/useLocalData";
import { supabase } from "../../services/supabase";
import { useAlert } from "../../hooks/useAlert";
import { useCategories } from "../../hooks/useCategories";
import { getCurrencySymbol } from "../../functions/getCurrencySymbol";

export const SupplyCreator = () => {
  const navigate = useNavigate();

  const { showAlertBox } = useAlert();
  const { restaurant } = useLocalData();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [um, setUm] = useState("KG");
  const [price, setPrice] = useState(0);
  const [waste, setWaste] = useState(0);
  const [taxes_included, setTaxes] = useState(true);

  const { categories, loading } = useCategories("supplies");

  useEffect(() => {
    if (categories && !loading) setCategory(categories[0].id);
  }, [categories]);

  if (loading) return <></>;

  const createSupply = async () => {
    if (name.length < 2)
      return showAlertBox({
        type: "ERROR",
        message: "Ingresa un nombre válido",
      });

    const { error } = await supabase.from("supplies").insert({
      name,
      restaurant: restaurant?.id,
      category,
      um,
      waste,
      price,
      taxes_included,
    });

    if (error)
      return showAlertBox({
        type: "ERROR",
        message: "Ha ocurrido un error al crear el insumo",
      });

    showAlertBox({
      type: "SUCCESS",
      message: "El insumo ha sido creado exitosamente",
    });

    navigate("/supplies");
  };

  return (
    <>
      <section className="w-full mb-4 flex items-center justify-between">
        <div className="w-2/5 flex items-center justify-start">
          <Link to={"/supplies"}>
            <MdArrowBack />
          </Link>
          <h2 className="font-semibold text-xl">Nuevo insumo:</h2>
        </div>
        <div className="w-3/5 flex items-center justify-end space-x-2">
          <Link to={"/supplies"}>Cancelar</Link>
          <button onClick={() => createSupply()}>Guardar</button>
        </div>
      </section>
      <section className="w-full flex flex-col">
        <h2>Detalles del insumo</h2>
        <hr />
        <label>
          Nombre:{" "}
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Categoría:{" "}
          <select onChange={(e) => setCategory(e.target.value)}>
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
          Unidad de medida:{" "}
          <select onChange={(e) => setUm(e.target.value)}>
            <option value={"KG"}>Kilogramos</option>
            <option value={"LT"}>Litros</option>
            <option value={"UND"}>Unidad</option>
          </select>
        </label>
        <label>
          Precio: {getCurrencySymbol(restaurant?.currency)}
          <input
            type={"number"}
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Merma:{" "}
          <input
            type={"number"}
            min={0}
            max={100}
            value={waste}
            onChange={(e) => setWaste(Number(e.target.value))}
          />
          %
        </label>
        <label>
          Afecto a impuestos:{" "}
          <input
            type={"checkbox"}
            checked={taxes_included}
            onChange={(e) => setTaxes(e.target.checked)}
          />
          {taxes_included ? "Sí" : "No"}
        </label>
      </section>
    </>
  );
};
