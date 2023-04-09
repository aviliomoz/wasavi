import { Logo } from "@/src/components/Logo";
import { RouteSwitcher } from "@/src/components/RouteSwitcher";
import { SessionDropdown } from "@/src/components/SessionDropdown";

interface Props {
  children: React.ReactNode;
  params: {
    user: string;
    restaurant: string;
  };
}

export default function RestaurantLayout({
  children,
  params: { user, restaurant },
}: Props) {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <Logo />
        <SessionDropdown user={user} restaurant={restaurant} />
      </header>
      <RouteSwitcher user={user} restaurant={restaurant} />
      <main className="mt-6">{children}</main>
    </>
  );
}
