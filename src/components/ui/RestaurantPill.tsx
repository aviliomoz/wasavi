// Icons
import { FaCog, FaStore } from "react-icons/fa";

// Hooks
import { useLocalData } from "../../hooks/useLocalData";

// Components
import { Pill } from "./Pill";

export const RestaurantPill = () => {
  const { restaurant } = useLocalData();

  if (!restaurant) return <></>;

  return (
    <Pill
      info={{ name: restaurant.name, icon: FaStore }}
      options={[
        { name: "Ajustes de restaurante", icon: FaCog, action: () => {} },
      ]}
    />
  );
};
