import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

// Components
import { RouteSwitcher } from "../components/RouteSwitcher";

// Types
import type { Target } from "../types/interfaces";
import { ElementsList } from "../components/ElementsList";

interface Props {
  target: Target;
}

const data = {
  products: {
    name: "productos",
    title: "Productos",
    new: "Nuevo producto",
    search: "Buscar producto",
  },
  supplies: {
    name: "insumos",
    title: "Insumos",
    new: "Nuevo insumo",
    search: "Buscar insumo",
  },
};

export const ElementsPage = ({ target }: Props) => {
  return (
    <section>
      <RouteSwitcher />
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-bold">{data[target].title}</h2>
        <Link
          to={`/${target}/editor/new`}
          className="rounded-md bg-emerald-500 text-white flex items-center gap-2 py-1 px-3 max-w-[120px]"
        >
          <FaPlusCircle className="text-2xl" />
          <span className="truncate">{data[target].new}</span>
        </Link>
      </div>
      <div className="border p-4 my-4 rounded-md h-14"></div>
      <ElementsList target={target} />
    </section>
  );
};
