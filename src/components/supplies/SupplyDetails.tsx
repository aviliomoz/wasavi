import { useParams, Link } from "react-router-dom";

// Components
import { IncludedBox } from "./IncludedBox";

// Hooks
import { useLocalData } from "../../hooks/useLocalData";
import { useSupply } from "../../hooks/useSupply";

// Functions
import { getCurrencySymbol } from "../../functions/getCurrencySymbol";
import { getFullUM } from "../../functions/getfullUM";

export const SupplyDetails = () => {
  const { id } = useParams();
  const { restaurant } = useLocalData();
  const { supply, loading } = useSupply(id);

  if (loading || !supply || !id || !restaurant) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="flex flex-col space-y-1 items-start">
      <p>
        <strong className="mr-2">Nombre: </strong>
        {supply.name}
      </p>
      <p>
        <strong className="mr-2">Categoría: </strong>
        {supply.categories.name}
      </p>
      <p>
        <strong className="mr-2">Unidad de medida: </strong>
        {getFullUM(supply.um)}
      </p>
      <p>
        <strong className="mr-2">Precio de compra: </strong>
        {getCurrencySymbol(restaurant.currency)}
        {supply.price}
      </p>
      <p>
        <strong className="mr-2">Merma: </strong>
        {`${supply.waste}%`}
      </p>
      <p>
        <strong className="mr-2">Afecto a impuestos: </strong>
        {supply.taxes_included ? "Sí" : "No"}
      </p>

      <hr style={{ margin: "20px 0px", width: "100%" }} />
      <p>
        <strong className="mr-2">Presente en los siguientes productos: </strong>
      </p>
      <IncludedBox />
      <Link to={`/supplies/edit/${id}`}>Editar insumo</Link>
    </div>
  );
};
