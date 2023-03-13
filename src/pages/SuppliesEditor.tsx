import { useParams } from "react-router-dom";

export const SuppliesEditor = () => {
  const { id } = useParams();

  if (id === "new") return <p>Nuevo insumo</p>;

  return <p>Edición de insumo: {id}</p>;
};
