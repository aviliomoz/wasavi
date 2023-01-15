// Components
import { Logo } from "./Logo";
import { AppMenu } from "./AppMenu";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen flex relative">
      <section className="w-[15%] min-h-screen py-6 px-4 flex flex-col items-center fixed">
        <Logo />
        <br />
        <AppMenu />
      </section>
      <section className="w-[85%] min-h-screen py-4 pl-0 pr-4 ml-[15%] relative">
        <div className="w-full h-full bg-gray-100 rounded-md relative overflow-hidden">
          {children}
        </div>
      </section>
    </div>
  );
};
