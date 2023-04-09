import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-2">
      <img src="/supabase-logo.svg" className="w-6" />
      <h1 className="font-bold text-xl">Wasavi</h1>
    </Link>
  );
};
