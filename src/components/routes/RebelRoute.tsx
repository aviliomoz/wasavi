import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const RebelRoute = () => {
  const { session, loading } = useAuth();

  if (!loading && session) return <Navigate to={"/home"} />;

  return !loading ? <>{<Outlet />}</> : <></>;
};
