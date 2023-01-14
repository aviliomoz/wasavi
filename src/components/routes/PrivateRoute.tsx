import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return navigate("/login");
      setLoading(false);
    });
  }, []);

  return !loading ? <>{<Outlet />}</> : <></>;
};
