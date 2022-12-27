import { LandingHeader } from "../../components/app/LandingHeader";
import RecoveryForm from "../../components/auth/RecoveryForm";

const RecoveryPage = () => {
  return (
    <>
      <LandingHeader />
      <main className="w-full flex justify-center">
        <div className="w-[30%] mt-10 rounded-md shadow-md p-10">
          <RecoveryForm />
        </div>
      </main>
    </>
  );
};

export default RecoveryPage;
