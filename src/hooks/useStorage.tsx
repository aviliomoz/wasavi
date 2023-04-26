import { useEffect } from "react";
import { useRestaurantStore } from "../stores/restaurantStore";
import { useSuppliesStore } from "../stores/suppliesStore";
import { dataname, initialData, ums } from "../utils/consts";
import { Data } from "../utils/types";
import { useSubproductsStore } from "../stores/subproductsStore";
import { useProductsStore } from "../stores/productsStore";

export const useStorage = () => {
  const { restaurant, currency, taxes } = useRestaurantStore();
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { products } = useProductsStore();

  useEffect(() => {
    const save = setTimeout(() => saveData(), 500);
    return () => clearTimeout(save);
  }, [supplies, restaurant, currency, taxes, subproducts, products]);

  const saveData = () => {
    const data: Data = {
      products,
      subproducts,
      supplies,
      restaurant,
      currency,
      taxes,
      ums,
    };

    localStorage.setItem(dataname, JSON.stringify(data));
  };

  const loadData = () => {
    const data: Data = JSON.parse(
      localStorage.getItem(dataname) || JSON.stringify(initialData)
    );

    useRestaurantStore.setState({
      restaurant: data.restaurant,
      currency: data.currency,
      taxes: data.taxes,
    });
    useSuppliesStore.setState({ supplies: data.supplies });
    useSubproductsStore.setState({ subproducts: data.subproducts });
    useProductsStore.setState({ products: data.products });
  };

  return { saveData, loadData };
};
