interface Props {
  title: string;
  value: number;
  set: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const NumberInput = ({ title, value, set }: Props) => {
  return (
    <label className="flex items-center">
      <strong>{title}: </strong>
      <input
        className="border ml-4 rounded-md py-1 px-3 w-full"
        type="number"
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => set(e)}
      />
    </label>
  );
};
