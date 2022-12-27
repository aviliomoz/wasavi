import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

// Utils
import { supabase } from "../utils/supabase";
import { updateWasaviData } from "../utils/auth";

// Components
import { UserPill } from "../components/app/UserPill";

interface Restaurant {
  id: string;
  name: string;
  currency: string;
}

const HomePage: NextPage = () => {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<Restaurant[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants().then((res) => setRestaurants(res));
    setLoading(false);
  }, []);

  const getRestaurants = async () => {
    let restaurants_list: Restaurant[] = [];
    let user_id: string | undefined = JSON.parse(
      localStorage.getItem("wasavi_data") || ""
    ).user.id;

    let { data: restaurants_users, error } = await supabase
      .from("restaurants_users")
      .select("*, restaurants(id, name, currency)")
      .eq("user", user_id);

    restaurants_users?.forEach((res) => restaurants_list.push(res.restaurants));

    return restaurants_list;
  };

  const handleSelect = (restaurant: Restaurant) => {
    updateWasaviData({ restaurant });
    router.push("/products");
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <UserPill />
      {restaurants &&
        restaurants.map((restaurant) => {
          return (
            <button
              onClick={() => handleSelect(restaurant)}
              key={restaurant.id}
            >
              {restaurant.name}
            </button>
          );
        })}
    </div>
  );
};

export default HomePage;
