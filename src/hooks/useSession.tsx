"use client";

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/browser-client";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  const getUser = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", session?.user.id)
      .single();

    return data;
  };

  return { getUser } as const;
};
