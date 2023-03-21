import "../src/styles/globals.css";
import { Header } from "@/src/components/Header";

export const metadata = {
  title: "Wasavi - Herramienta de gestión de productos para restaurantes",
  description: "Herramienta de gestión de productos para restaurantes",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className="min-h-[100svh] px-4 py-4"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        {/* @ts-expect-error Async Server Component */}
        <Header />
        {children}
      </body>
    </html>
  );
}
