import "../src/styles/globals.css";
import { Inter } from "next/font/google";

// Components
import { DownloadButton } from "@/src/components/DownloadButton";
import { Logo } from "@/src/components/Logo";
import { Navigation } from "@/src/components/Navigation";
import { ImportButton } from "@/src/components/ImportButton";
import { RestaurantTitle } from "@/src/components/RestaurantTitle";
import { CurrencyInput } from "@/src/components/CurrencyInput";
import { TaxesInput } from "@/src/components/TaxesInput";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Wasavi - Herramienta de costeo de recetas para restaurantes",
  description: "Herramienta de costeo de recetas para restaurantes",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="min-h-[100svh] py-10 px-24"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-10">
            <Logo />
            <Navigation />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <RestaurantTitle />
            <CurrencyInput />
            <TaxesInput />
            <ImportButton />
            <DownloadButton />
          </div>
        </header>
        <main className="min-h-[450px] bg-gray-200 rounded-md p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
