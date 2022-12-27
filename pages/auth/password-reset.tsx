import { LandingHeader } from "../../components/app/LandingHeader";
import ResetForm from "../../components/auth/ResetForm";

const ResetPage = () => {
  return (
    <>
      <LandingHeader />
      <main className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <ResetForm />
        </div>
      </main>
    </>
  );
};

export default ResetPage;
