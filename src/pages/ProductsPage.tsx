import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { getProductsByPagination, getProductsCount } from "../utils/products";

import type { Product } from "../types/interfaces";
import { ItemCard } from "../components/ItemCard";
import { RouteSwitcher } from "../components/RouteSwitcher";

const productsPerPage = 10;

export const ProductsPage = () => {
  const { pagination } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    pagination &&
      getProductsByPagination(Number(pagination), productsPerPage).then(
        setProducts
      );
  }, [pagination]);

  return (
    <section>
      <RouteSwitcher />
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-bold">Productos</h2>
        <Link
          to="/products/editor/new"
          className="rounded-md bg-emerald-500 text-white flex items-center gap-2 py-1 px-3 max-w-[120px]"
        >
          <FaPlusCircle className="text-2xl" />
          <span className="truncate">Nuevo producto</span>
        </Link>
      </div>
      <div className="border p-4 my-4 rounded-md h-14"></div>
      <div>
        {products.map((product) => {
          return (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.name}
              target="products"
            />
          );
        })}
      </div>
      <Pagination
        currentPage={Number(pagination)}
        target="products"
        loader={getProductsCount}
        elementsPerPage={productsPerPage}
      />
    </section>
  );
};
