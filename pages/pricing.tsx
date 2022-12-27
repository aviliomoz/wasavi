import { NextPage } from "next";
import { LandingHeader } from "../components/app/LandingHeader";

const PricingPage: NextPage = () => {
  return (
    <>
      <LandingHeader />
      <main className="w-full flex justify-center">Pricing page</main>
    </>
  );
};

export default PricingPage;
