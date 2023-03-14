import { ItemCard } from "./ItemCard";
import { Pagination } from "./Pagination";
import { Loading } from "./Loading";
import { Product, Supply, Target } from "../types/interfaces";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getElementsByPagination } from "../utils/elements";

interface Props {
  target: Target;
}

const elementsPerPage = 10;

export const ElementsList = ({ target }: Props) => {
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

  if (!elements)
    return (
      <div className="mt-20 flex justify-center">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="mb-6 min-h-[480px]">
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
      </div>
      <Pagination
        currentPage={Number(pagination)}
        target={target}
        elementsPerPage={elementsPerPage}
      />
    </>
  );
};
