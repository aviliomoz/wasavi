import { redirect } from "next/navigation";
import supabaseClient from "../../src/supabase/server-client";

interface Props {
  children: React.ReactNode;
  params: {
    user: string;
  };
}

export default async function LoggedLayout({ children }: Props) {
  const supabase = supabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect("/login");

  return (
    <main>{children}</main>
  );
}
