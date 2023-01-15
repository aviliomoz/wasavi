import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Components
import { supabase } from "../services/supabase";
import { useLocalData } from "../hooks/useLocalData";

interface Item {
  id: string;
  name: string;
}

interface Props {
  target: "supplies" | "products";
}

export const ItemsList = ({ target }: Props) => {
  const { getLocalData } = useLocalData();
  const [items, setItems] = useState<Item[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then(setItems);
    setLoading(false);
  }, []);

  const getItems = async (): Promise<Item[] | []> => {
    const restaurantID = getLocalData().restaurant;
    const { data, error } = await supabase
      .from(target)
      .select("id, name")
      .eq("restaurant", restaurantID);

    if (error || !data) return [];

    return data;
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div>
      {items?.sort().map((item) => {
        return (
          <NavLink
            to={`/${target}/${item.id}`}
            key={item.id}
            className="group flex items-center cursor-pointer mb-2"
          >
            {({ isActive }) => {
              return (
                <>
                  <div
                    className={`h-2  rounded-sm group-hover:w-4 mr-2 transition-all ${
                      isActive ? "w-4 bg-emerald-500" : "w-2 bg-gray-300"
                    }`}
                  ></div>
                  <span className={`truncate ${isActive ? "font-medium" : ""}`}>
                    {item.name}
                  </span>
                </>
              );
            }}
          </NavLink>
        );
      })}
    </div>
  );
};
