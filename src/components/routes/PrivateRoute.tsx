import { Outlet, Navigate, useLoaderData } from "react-router-dom";

export const PrivateRoute = () => {
  const session = useLoaderData();

  if (!session) return <Navigate to={"/login"} />;

  return <Outlet />;
};
