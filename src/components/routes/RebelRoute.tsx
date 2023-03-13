import { Outlet, Navigate, useLoaderData } from "react-router-dom";

export const RebelRoute = () => {
  const session = useLoaderData();

  if (session) return <Navigate to={"/home"} />;

  return <Outlet />;
};
