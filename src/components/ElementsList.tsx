"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase/browser-client";
import { Element, Target } from "../types/interfaces";
import { getElementsList } from "../utils/elements";
import Link from "next/link";

interface Props {
  target: Target;
  user: string;
  restaurant: string;
}

interface TargetName {
  singular: string;
  plural: string;
}

export const ElementsList = ({ target, user, restaurant }: Props) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getElementsList(target, restaurant).then(setElements);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "countries" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  const getTargetName = (target: Target): TargetName => {
    switch (target) {
      case "products":
        return { singular: "producto", plural: "productos" };
      case "sub-recipes":
        return { singular: "sub receta", plural: "sub receta" };
      case "supplies":
        return { singular: "insumo", plural: "insumos" };
      default:
        return { singular: "producto", plural: "productos" };
    }
  };

  if (loading) return <p>Cargando...</p>;

  if (!loading && elements.length < 1)
    return (
      <div className="mt-20 text-center">
        <p className="mb-6 text-gray-800">Aún no hay {getTargetName(target).plural} para mostrar</p>
        <Link className="bg-emerald-500 text-white rounded-md px-3 py-2" href={`/${user}/${restaurant}/${target}/new`}>
          Crear {getTargetName(target).singular}
        </Link>
      </div>
    );

  return (
    <ul className="mt-4">
      {elements.map((element: Element) => {
        return (
          <li key={element.id}>
            <Link
              className="flex items-center justify-between gap-4 mb-1 pr-4 pl-2 py-2 rounded-md border border-transparent hover:border-gray-200"
              href={`/${user}/${restaurant}/${target}/editor/${element.id}`}
            >
              <span>{element.name}</span>
              <span
                className={`text-sm ${
                  element.status ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {element.status ? "Activo" : "Inactivo"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
