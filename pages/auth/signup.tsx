import { LandingHeader } from "../../components/app/LandingHeader";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <>
      <LandingHeader />
      <main className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <SignupForm />
        </div>
      </main>
    </>
  );
};

export default SignupPage;
