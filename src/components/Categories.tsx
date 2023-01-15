import { useState, useEffect } from "react";

// Icons
import { FaPlus, FaPen } from "react-icons/fa";

// Utils
import { supabase } from "../services/supabase";
import { useLocalData } from "../hooks/useLocalData";

interface Category {
  name: string;
  id: string;
}

interface Props {
  target: "supplies" | "products";
}

export const Categories = ({ target }: Props) => {
  const { getLocalData } = useLocalData();
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const getCategories = async (): Promise<Category[] | []> => {
    const restaurantID = getLocalData().restaurant;

    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("restaurant", restaurantID)
      .eq("type", target);

    if (error || !data) return [];

    return data;
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Categorías</h3>
        <button className="bg-emerald-500 p-1 rounded-md text-white text-xs">
          <FaPlus />
        </button>
      </div>
      <ul className="w-full">
        {categories?.sort().map((category) => {
          return (
            <li
              key={category.id}
              className="relative w-full flex items-center mb-1 group"
            >
              <input
                type="checkbox"
                className="form-checkbox checked:bg-emerald-500 w-4 h-4 hover:bg-gray-50 rounded-md cursor-pointer focus:ring-white hover:checked:bg-emerald-500"
              />
              <label className="ml-2">{category.name}</label>
              <button className="absolute invisible right-0 text-gray-400 text-sm group-hover:visible hover:text-emerald-500">
                <FaPen />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
