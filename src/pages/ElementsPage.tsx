import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

// Components
import { Pagination } from "../components/Pagination";
import { RouteSwitcher } from "../components/RouteSwitcher";
import { ItemCard } from "../components/ItemCard";

// Utils
import { getElementsByPagination } from "../utils/elements";

// Types
import type { Product, Supply, Target } from "../types/interfaces";
import { Loading } from "../components/Loading";

interface Props {
  target: Target;
}

const elementsPerPage = 10;

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
  const { pagination } = useParams();

  const [elements, setElements] = useState<Product[] | Supply[] | null>(null);

  useEffect(() => {
    setElements(null);
    if (pagination) {
      getElementsByPagination(target, Number(pagination), elementsPerPage).then(
        setElements
      );
    }
  }, [pagination, target]);

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
      <div className="mb-6">
        {!elements ? (
          <div className="mt-20 flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {elements.map((element) => {
              return (
                <ItemCard
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  target={target}
                />
              );
            })}
            <Pagination
              currentPage={Number(pagination)}
              target={target}
              elementsPerPage={elementsPerPage}
            />
          </>
        )}
      </div>
    </section>
  );
};
