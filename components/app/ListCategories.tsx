import { useState, useEffect } from "react";

// Icons
import { FaPlusCircle, FaPen } from "react-icons/fa";

// Utils
import { supabase } from "../../utils/supabase";

// Types
import { TargetEnum } from "../../utils/enums";

interface Props {
  target: TargetEnum;
}

interface Category {
  name: string;
  id: string;
}

export const ListCategories = ({ target }: Props) => {
  const [categories, setCategories] = useState<Category[] | [] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const getCategories = async () => {
    const restaurantID: string = JSON.parse(
      localStorage.getItem("wasavi_data") || ""
    ).restaurant.id;

    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .match({ restaurant: restaurantID, type: target });

    return data;
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Categorías</h3>
        <button className="bg-emerald-500 p-1 rounded-md text-white text-sm">
          <FaPlusCircle />
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
