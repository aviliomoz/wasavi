import { useParams, Link } from "react-router-dom";

// Components
import { RecipeBox } from "./RecipeBox";

// Hooks
import { useLocalData } from "../../hooks/useLocalData";
import { useProduct } from "../../hooks/useProduct";

// Functions
import { getCurrencySymbol } from "../../functions/getCurrencySymbol";
import { getFullUM } from "../../functions/getfullUM";

export const ProductDetails = () => {
  const { id } = useParams();
  const { restaurant } = useLocalData();
  const { product, loading } = useProduct(id);

  if (loading || !product || !id || !restaurant) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="flex flex-col space-y-1 items-start">
      <p>
        <strong className="mr-2">Nombre: </strong>
        {product.name}
      </p>
      <p>
        <strong className="mr-2">Categoría: </strong>
        {product.category?.name}
      </p>
      <p>
        <strong className="mr-2">Se vende: </strong>
        {product.is_for_sale ? "Sí" : "No"}
      </p>
      {product.is_for_sale && (
        <p>
          <strong className="mr-2">Precio de venta: </strong>
          {getCurrencySymbol(restaurant.currency)} {product.price}
        </p>
      )}
      <hr style={{ margin: "20px 0px", width: "100%" }} />
      <p>
        <strong className="mr-2">Receta para: </strong>
        {product.amount} {getFullUM(product.um)}
      </p>
      <RecipeBox />
      <Link to={`/products/edit/${id}`}>Editar producto</Link>
    </div>
  );
};
