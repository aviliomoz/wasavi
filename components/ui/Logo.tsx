import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-3">
      <img src="supabase-logo.svg" className="w-8" />
      <h1 className="font-bold text-2xl">Wasavi</h1>
    </Link>
  );
};

export default Logo;
