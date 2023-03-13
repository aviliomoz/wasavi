import { useParams } from "react-router-dom";

export const ProductsEditor = () => {
  const { id } = useParams();

  if (id === "new") return <p>Nuevo producto</p>;

  return <p>Edición de producto: {id}</p>;
};
