import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Target } from "../types/interfaces";
import { getElementsCount } from "../utils/elements";

interface Props {
  currentPage: number;
  elementsPerPage: number;
  target: Target;
}

export const Pagination = ({ currentPage, elementsPerPage, target }: Props) => {
  const [elements, setElements] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    getElementsCount(target).then(setElements);
  }, []);

  useEffect(() => {
    setPages(Math.ceil(elements / elementsPerPage));
  }, [elements]);

  useEffect(() => {
    let list = [];

    while (list.length < pages) {
      list.push(list.length + 1);
    }

    setNumbers(list);
  }, [pages]);

  const checkVisibility = (number: number): boolean => {
    if (number === currentPage) return true;
    if (number === currentPage - 1) return true;
    if (number === currentPage + 1) return true;

    return false;
  };

  if (elements <= elementsPerPage) return <></>;

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-1">
        {currentPage !== 1 && (
          <Link to={`/${target}/${currentPage - 1}`}>
            <FiChevronLeft />
          </Link>
        )}
        {currentPage >= 3 && <span>...</span>}
        {numbers.map((number) => (
          <button
            className={`w-8 h-8 rounded-md overflow-hidden  ${
              !checkVisibility(number) && "hidden"
            }`}
          >
            <Link
              to={`/${target}/${number}`}
              className={`w-full h-full flex justify-center items-center  ${
                number === currentPage
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {number}
            </Link>
          </button>
        ))}
        {pages - currentPage > 1 && <span>...</span>}
        {currentPage !== pages && (
          <Link to={`/${target}/${currentPage + 1}`}>
            <FiChevronRight />
          </Link>
        )}
      </div>
    </div>
  );
};
