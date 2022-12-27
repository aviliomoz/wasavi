import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// Types
import { TargetEnum } from "../../utils/enums";

// Components
import { Pagination } from "./Pagination";
import { supabase } from "../../utils/supabase";

// Utils
import { setProduct, setSupply } from "../../utils/slices/itemSlice";

interface Props {
  target: TargetEnum;
}

interface Item {
  id: string;
  name: string;
}

export const ListItems = ({ target }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = Number(router.query.page) || 1;

  const [items, setItems] = useState<Item[] | [] | null>([]);
  const [itemsCount, setItemsCount] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  const { product, supply } = useSelector((state: any) => state.item);

  useEffect(() => {
    getItems().then((res) => {
      setItems(res.data);
      setItemsCount(res.count);
    });
    setLoading(false);

    return () => {
      dispatch(setProduct(null));
      dispatch(setSupply(null));
    };
  }, []);

  const getTarget = (target: TargetEnum) => {
    if (target === TargetEnum.PRODUCTS) {
      return "products";
    } else {
      return "supplies";
    }
  };

  const getItems = async () => {
    const restaurantID: string = JSON.parse(
      localStorage.getItem("wasavi_data") || ""
    ).restaurant.id;
    const { data, error, count } = await supabase
      .from(getTarget(target))
      .select("id, name", { count: "exact" })
      .match({ restaurant: restaurantID });

    return { data, count };
  };

  const handleClick = (item: Item) => {
    if (target === TargetEnum.PRODUCTS) {
      dispatch(setProduct(item.id));
    } else {
      dispatch(setSupply(item.id));
    }
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <>
      <ul>
        {items?.map((item) => {
          return (
            <li
              onClick={() => handleClick(item)}
              key={item.id}
              className="group flex items-center cursor-pointer mb-2"
            >
              <div
                className={`h-2  rounded-sm group-hover:w-4 mr-2 transition-all ${
                  item.id === product || item.id === supply
                    ? "w-4 bg-emerald-500"
                    : "w-2 bg-gray-300"
                }`}
              ></div>
              <span
                className={`truncate ${
                  item.id === product || item.id === supply ? "font-medium" : ""
                }`}
              >
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
      <Pagination itemsCount={itemsCount} currentPage={currentPage} />
    </>
  );
};
