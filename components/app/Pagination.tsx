import { useEffect, useState } from "react";

// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface Props {
  itemsCount: any;
  currentPage: number;
}

export const Pagination = ({ itemsCount, currentPage }: Props) => {
  const [pages, setPages] = useState<number[] | []>([]);

  const pagesNumber: number = Math.ceil(itemsCount / 10);

  useEffect(() => {
    let list: number[] = [];

    while (list.length < pagesNumber) {
      list.push(list.length + 1);
    }

    setPages(list);
  }, []);

  if (itemsCount < 10) return <></>;

  return (
    <div className="w-full flex items-center justify-center absolute bottom-6 left-0">
      {currentPage !== 1 && (
        <Link
          className="mr-2 text-gray-400 hover:text-emerald-500"
          href={`/products?page=${currentPage - 1}`}
        >
          <FaChevronLeft />
        </Link>
      )}
      {}
      {pages.map((page, index) => {
        return (
          <Link
            className={`py-1 px-2 rounded-md text-sm mx-1  ${
              page === currentPage
                ? "text-white bg-emerald-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            key={index}
            href={`/products?page=${page}`}
          >
            {page}
          </Link>
        );
      })}
      {currentPage !== pages.length && (
        <Link
          className="ml-2 text-gray-400 hover:text-emerald-500"
          href={`/products?page=${currentPage + 1}`}
        >
          <FaChevronRight />
        </Link>
      )}
    </div>
  );
};
