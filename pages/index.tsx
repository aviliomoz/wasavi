import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

// Utils
import { supabase } from "../utils/supabase";

// Components
import AlertBox from "../components/ui/AlertBox";
import { LandingHeader } from "../components/app/LandingHeader";

const LandingPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "PASSWORD_RECOVERY") router.push("/auth/password-reset");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Wasavi - App de gestión de recetas para negocios gastronónomicos.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen min-h-screen relative">
        <LandingHeader />
        <AlertBox />
      </main>
    </>
  );
};

export default LandingPage;
