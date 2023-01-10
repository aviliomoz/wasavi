import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

// Utils
import { supabase } from "../supabase";

// Components
import { LandingLayout } from "../components/app/LandingLayout";

const LandingPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && event == "PASSWORD_RECOVERY")
        router.push("/auth/password-reset");
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          Wasavi - App de gestión de recetas para negocios gastronónomicos.
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen min-h-screen relative">
        <LandingLayout>
          <></>
        </LandingLayout>
      </main>
    </>
  );
};

export default LandingPage;
