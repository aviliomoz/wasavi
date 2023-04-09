import { redirect } from "next/navigation";
import supabaseClient from "../../src/supabase/server-client";
import { Logo } from "@/src/components/Logo";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const supabase = supabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return redirect(`/${session.user.id}`);

  return (
    <section className="flex flex-col items-center py-20 px-4">
      <Logo />
      <div className="w-full max-w-xs mt-10 bg-white rounded-md shadow-sm p-8">
        {children}
      </div>
    </section>
  );
}
