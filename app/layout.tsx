import "../src/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Wasavi - Herramienta de gestión de productos para restaurantes",
  description: "Herramienta de gestión de productos para restaurantes",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="min-h-[100svh] px-4 py-4"
        style={{ backgroundColor: "#fff" }}
      >
        {children}
      </body>
    </html>
  );
}
