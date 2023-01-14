import { useSetRecoilState } from "recoil";
import { alertState } from "../contexts/alertState";
import { supabase } from "../services/supabase";

// Types
import { LocalData } from "../types/interfaces";

const initialData: LocalData = { user: "", restaurant: "", restaurants: [] };

export const useLocalData = (key: string = "wasavi_data") => {
  const setAlert = useSetRecoilState(alertState);

  const getLocalData = (): LocalData => {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialData));
  };

  const updateLocalData = (newData: {
    user?: string;
    restaurant?: string;
    restaurants?: string[] | [];
  }) => {
    const localData = getLocalData();
    const updatedLocalData = { ...localData, ...newData };

    localStorage.setItem(key, JSON.stringify(updatedLocalData));
  };

  const clearLocalData = () => {
    localStorage.removeItem(key);
  };

  const setLocalData = async () => {
    let localData: LocalData = initialData;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      localData.user = "";

      setAlert({ type: "error", message: "Error al cargar el ID del usuario" });
    } else {
      localData.user = user.id;

      const { data: restaurants, error } = await supabase
        .from("restaurants_users")
        .select("restaurant")
        .eq("user", user.id);

      if (error || !restaurants) {
        localData.restaurants = [];

        setAlert({
          type: "error",
          message: "Error al cargar la lista restaurantes",
        });
      } else {
        localData.restaurants = restaurants.map((r) => r.restaurant);
      }

      updateLocalData(localData);
    }
  };

  return {
    getLocalData,
    updateLocalData,
    setLocalData,
    clearLocalData,
  };
};
