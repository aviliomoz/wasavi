import { useEffect } from "react";

// Utils
import { supabase } from "../../supabase";

// Components
import { LandingLayout } from "../../components/app/LandingLayout";
import RecoveryForm from "../../components/auth/RecoveryForm";

const RecoveryPage = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) location.assign("/home");
    });
  }, []);

  return (
    <LandingLayout>
      <div className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <RecoveryForm />
        </div>
      </div>
    </LandingLayout>
  );
};

export default RecoveryPage;
