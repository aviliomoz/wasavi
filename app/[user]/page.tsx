import { Logo } from "@/src/components/Logo";
import { LogoutButton } from "@/src/components/LogoutButton";
import { getRestaurantsByUser } from "@/src/utils/restaurants";
import Link from "next/link";

interface Props {
  params: {
    user: string;
  };
}

export default async function UserPage({ params: { user } }: Props) {
  const restaurants = await getRestaurantsByUser(user);

  return (
    <section>
      <header className="flex justify-between items-center mb-16">
        <Logo />
        <LogoutButton />
      </header>
      <h2 className="text-center font-semibold text-lg">
        Selecciona un restaurante:
      </h2>
      <div className="flex flex-col items-center gap-2 mt-8">
        {restaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant.id}
              className="border bg-white rounded-md w-full max-w-xs text-center p-4"
              href={`/${user}/${restaurant.id}/products`}
            >
              {restaurant.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
