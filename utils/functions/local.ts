import { User, Restaurant } from "../interfaces";

interface LocalData {
  user?: User;
  restaurant?: Restaurant;
}

export const setLocalData = (data: LocalData) => {
  localStorage.setItem("wasavi_data", JSON.stringify(data));
};

export const getLocalData = (): LocalData => {
  const data: string | null = localStorage.getItem("wasavi_data");

  if (!data) return { user: undefined, restaurant: undefined };

  return JSON.parse(data);
};

export const updateLocalData = (newData: LocalData) => {
  const data = getLocalData();

  setLocalData({ ...data, ...newData });
};
