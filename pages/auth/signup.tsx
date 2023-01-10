import { useEffect } from "react";

// Utils
import { supabase } from "../../supabase";

// Components
import { LandingLayout } from "../../components/app/LandingLayout";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) location.assign("/home");
    });
  }, []);

  return (
    <LandingLayout>
      <div className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <SignupForm />
        </div>
      </div>
    </LandingLayout>
  );
};

export default SignupPage;
