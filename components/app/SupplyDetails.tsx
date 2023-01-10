import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Utils
import { supabase } from "../../supabase";
import { getCurrencySymbol } from "../../utils/functions/currency";
import { getLocalData } from "../../utils/functions/local";

// Types
import { Currency, getFullUM } from "../../utils/interfaces";
import { Supply } from "../../utils/interfaces";

// Components
import { IncludedBox } from "./IncludedBox";

export const SupplyDetails = () => {
  const router = useRouter();

  const [details, setDetails] = useState<Supply>();
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (router.query.id) {
      getSupplyDetails().then((res) => {
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

  const getSupplyDetails = async () => {
    const { data, error } = await supabase
      .from("supplies")
      .select("*, categories(name)")
      .eq("id", router.query.id)
      .single();

    return data;
  };

  if (!router.query.id) {
    return <div>Selecciona un insumo</div>;
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
        <strong className="mr-2">Unidad de medida: </strong>
        {details && getFullUM(1, details?.um, false)}
      </p>
      <p>
        <strong className="mr-2">Precio de compra: </strong>
        {details && getCurrencySymbol(currency)} {details?.price}
      </p>
      <p>
        <strong className="mr-2">Merma: </strong>
        {`${details?.waste}%`}
      </p>
      <p>
        <strong className="mr-2">Afecto a impuestos: </strong>
        {details?.taxes_included ? "Sí" : "No"}
      </p>

      <hr style={{ margin: "20px 0px", width: "100%" }} />
      <p>
        <strong className="mr-2">Presente en los siguientes productos: </strong>
      </p>
      <IncludedBox />
      <button
        onClick={() =>
          router.push(`${router.pathname}?id=${router.query.id}&action=edit`)
        }
      >
        Editar insumo
      </button>
    </div>
  );
};
