import { LandingHeader } from "./LandingHeader";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
};
