import { LocalData, Restaurant, User } from "../types/interfaces";

const key = "wasavi_data";

const initialData: LocalData = {
  user: undefined,
  restaurant: undefined,
};

export const getLocalData = (): LocalData => {
  const raw_data: string =
    localStorage.getItem(key) || JSON.stringify(initialData);
  return JSON.parse(raw_data);
};

export const updateUser = (user: User) => {
  const data = getLocalData();
  localStorage.setItem(key, JSON.stringify({ ...data, user }));
};

export const updateRestaurant = (restaurant: Restaurant | undefined) => {
  const data = getLocalData();
  localStorage.setItem(key, JSON.stringify({ ...data, restaurant }));
};

export const cleanLocalData = () => {
  localStorage.removeItem(key);
};
