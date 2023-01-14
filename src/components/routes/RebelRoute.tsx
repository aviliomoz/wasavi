import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate, Outlet } from "react-router-dom";

export const RebelRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) return navigate("/home");
      setLoading(false);
    });
  }, []);

  return !loading ? <>{<Outlet />}</> : <></>;
};
