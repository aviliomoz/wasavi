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

// Components
import { IncludedBox } from "./IncludedBox";

interface Supply {
  id: string;
  name: string;
  category: string;
  categories: {
    name: string;
  };
  restaurant: string;
  um: UMEnum;
  waste: number;
  price: number;
  taxes_included: boolean;
}

export const SupplyDetails = () => {
  const { supply } = useSelector((state: any) => state.item);
  const [details, setDetails] = useState<Supply | null>(null);
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (supply) {
      getSupplyDetails().then((res) => {
        setDetails(res);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  }, [supply]);

  useEffect(() => {
    setCurrency(
      JSON.parse(localStorage.getItem("wasavi_data") || "").restaurant.currency
    );
  }, []);

  const getSupplyDetails = async () => {
    const { data, error } = await supabase
      .from("supplies")
      .select("*, categories(name)")
      .eq("id", supply)
      .single();

    return data;
  };

  if (!details) {
    return <div>Selecciona un insumo</div>;
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
        <strong className="mr-2">Unidad de medida: </strong>
        {getFullUM(1, details?.um, false)}
      </p>
      <p>
        <strong className="mr-2">Precio de compra: </strong>
        {getCurrencySymbol(details?.price, currency)}
      </p>
      <p>
        <strong className="mr-2">Merma: </strong>
        {`${details?.waste}%`}
      </p>
      <p>
        <strong className="mr-2">Afecto a impuestos: </strong>
        {details?.taxes_included ? "Sí" : "No"}
      </p>

      <hr style={{ margin: "20px 0px" }} />
      <p>
        <strong className="mr-2">Presente en los siguientes productos: </strong>
      </p>
      <IncludedBox />
    </div>
  );
};
