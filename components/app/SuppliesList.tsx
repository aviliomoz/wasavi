import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Components
import { Pagination } from "./Pagination";
import { supabase } from "../../supabase";
import { getLocalData } from "../../utils/functions/local";

interface Item {
  id: string;
  name: string;
}

export const SuppliesList = () => {
  const router = useRouter();

  const [items, setItems] = useState<Item[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
    setLoading(false);
  }, []);

  const getItems = async (): Promise<Item[] | []> => {
    const restaurantID = getLocalData().restaurant?.id;
    const { data, error } = await supabase
      .from("supplies")
      .select("id, name")
      .eq("restaurant", restaurantID);

    if (error || !data) return [];

    return data;
  };

  const handleClick = (item: Item) => {
    router.push(`${router.pathname}?id=${item.id}`);
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <>
      <ul>
        {items?.sort().map((item) => {
          return (
            <li
              onClick={() => handleClick(item)}
              key={item.id}
              className="group flex items-center cursor-pointer mb-2"
            >
              <div
                className={`h-2  rounded-sm group-hover:w-4 mr-2 transition-all ${
                  item.id === router.query.id
                    ? "w-4 bg-emerald-500"
                    : "w-2 bg-gray-300"
                }`}
              ></div>
              <span
                className={`truncate ${
                  item.id === router.query.id ? "font-medium" : ""
                }`}
              >
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
