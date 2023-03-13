import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center space-x-2">
      <img src="/supabase-logo.svg" className="w-6" />
      <h1 className="font-bold text-2xl">Wasavi</h1>
    </Link>
  );
};
