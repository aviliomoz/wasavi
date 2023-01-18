import { useState } from "react";

// Types
import { LocalData } from "../types/interfaces";

const initialData: LocalData = {
  user: "",
  restaurant: "",
};

export const useLocalData = (key: string = "wasavi_data") => {
  const [data] = useState<LocalData>(
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialData))
  );

  const updateUser = (user: string) => {
    localStorage.setItem(key, JSON.stringify({ ...data, user }));
  };

  const updateRestaurant = (restaurant: string) => {
    localStorage.setItem(key, JSON.stringify({ ...data, restaurant }));
  };

  const cleanLocalData = () => {
    localStorage.removeItem(key);
  };

  return {
    user: data.user,
    restaurant: data.restaurant,
    updateUser,
    updateRestaurant,
    cleanLocalData,
  } as const;
};
