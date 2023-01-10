import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

// Types
import { Currency, getFullUM, UMEnum } from "../../utils/interfaces";
import { RecipeBox } from "./RecipeBox";
import { useRouter } from "next/router";
import { getCurrencySymbol } from "../../utils/functions/currency";

import { Product } from "../../utils/interfaces";
import { getLocalData } from "../../utils/functions/local";

export const ProductDetails = () => {
  const router = useRouter();

  const [details, setDetails] = useState<Product>();
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (router.query.id) {
      getProductDetails().then((res) => {
        setDetails(res);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  }, [router.query.id]);

  useEffect(() => {
    setCurrency(getLocalData().restaurant?.currency || Currency.USD);
  }, []);

  const getProductDetails = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", router.query.id)
      .single();

    return data;
  };

  if (!router.query.id) {
    return <div>Selecciona un producto</div>;
  }

  if (loading) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="flex flex-col space-y-1 items-start">
      <p>
        <strong className="mr-2">Nombre: </strong>
        {details?.name}
      </p>
      <p>
        <strong className="mr-2">Categoría: </strong>
        {details?.categories.name}
      </p>
      <p>
        <strong className="mr-2">Se vende: </strong>
        {details?.is_for_sale ? "Sí" : "No"}
      </p>
      {details?.is_for_sale && (
        <p>
          <strong className="mr-2">Precio de venta: </strong>
          {getCurrencySymbol(currency)} {details.price}
        </p>
      )}
      <hr style={{ margin: "20px 0px", width: "100%" }} />
      <p>
        <strong className="mr-2">Receta para: </strong>
        {details?.amount && getFullUM(details?.amount, details?.um)}
      </p>
      <RecipeBox />
      <button
        onClick={() =>
          router.push(`${router.pathname}?id=${router.query.id}&action=edit`)
        }
      >
        Editar producto
      </button>
    </div>
  );
};
