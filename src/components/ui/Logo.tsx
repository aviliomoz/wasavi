import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center space-x-3">
      <img src="/supabase-logo.svg" className="w-8" />
      <h1 className="font-bold text-2xl">Wasavi</h1>
    </Link>
  );
};
