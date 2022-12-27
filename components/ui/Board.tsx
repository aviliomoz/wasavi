interface Props {
  children?: any;
  width: string;
  title: string;
  fullSize?: boolean;
}

export const Board = ({ children, width, title, fullSize = false }: Props) => {
  return (
    <div
      className={`relative bg-white rounded-md shadow-sm p-4 flex flex-col ${width} ${
        fullSize ? "h-[520px]" : "h-max"
      }`}
    >
      <h3 className="font-semibold">{title}</h3>
      <hr className="mt-3 mb-4" />
      {children}
    </div>
  );
};
