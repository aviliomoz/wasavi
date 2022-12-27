import { LandingHeader } from "../../components/app/LandingHeader";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <LandingHeader />
      <main className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
