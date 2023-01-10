import { useEffect, useState } from "react";
import { getRestaurantData } from "../../utils/functions/auth";
import { updateLocalData } from "../../utils/functions/local";
import { Restaurant } from "../../utils/interfaces";

interface Props {
  id: string;
}

export const RestaurantCard = ({ id }: Props) => {
  const [data, setData] = useState<Restaurant>();

  useEffect(() => {
    getRestaurantData(id).then((res) => res && setData(res));
  });

  const handleClick = () => {
    updateLocalData({ restaurant: data });
    document.location.assign("/products");
  };

  if (!data) return <div>Cargando...</div>;

  return <button onClick={handleClick}>{data.name}</button>;
};
