import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = () => {
  const { session, loading } = useAuth();

  if (!loading && !session) return <Navigate to={"/login"} />;

  return !loading ? <>{<Outlet />}</> : <></>;
};
