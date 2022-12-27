import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../utils/supabase";

// Types
import {
  CurrencyEnum,
  getCurrencySymbol,
  getFullUM,
  UMEnum,
} from "../../utils/enums";
import { RecipeBox } from "./RecipeBox";

interface Product {
  id: string;
  name: string;
  category: string;
  categories: {
    name: string;
  };
  restaurant: string;
  um: UMEnum;
  amount: number;
  price: number;
  is_for_sale: boolean;
}

export const ProductDetails = () => {
  const { product } = useSelector((state: any) => state.item);
  const [details, setDetails] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (product) {
      getProductDetails().then((res) => {
        setDetails(res);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  }, [product]);

  useEffect(() => {
    setCurrency(
      JSON.parse(localStorage.getItem("wasavi_data") || "").restaurant.currency
    );
  }, []);

  const getProductDetails = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", product)
      .single();

    return data;
  };

  if (!details) {
    return <div>Selecciona un producto</div>;
  }

  if (loading) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="flex flex-col space-y-1">
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
          {getCurrencySymbol(details?.price, currency)}
        </p>
      )}
      <hr style={{ margin: "20px 0px" }} />
      <p>
        <strong className="mr-2">Receta para: </strong>
        {getFullUM(details?.amount, details?.um)}
      </p>
      <RecipeBox />
    </div>
  );
};
