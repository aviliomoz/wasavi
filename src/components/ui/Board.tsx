interface Props {
  children: JSX.Element | JSX.Element[];
  width: string;
  title: string;
  fullSize?: boolean;
}

export const Board = ({ children, width, title }: Props) => {
  return (
    <div
      className={`relative bg-white rounded-sm border p-4 flex flex-col h-max ${width} `}
    >
      <h3 className="font-semibold">{title}</h3>
      <hr className="mt-3 mb-4" />
      {children}
    </div>
  );
};
