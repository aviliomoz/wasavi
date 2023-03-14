interface Props {
  title: string;
  value: string;
  set: (value: string) => void;
}

export const TextInput = ({ title, value, set }: Props) => {
  return (
    <label className="flex items-center">
      <strong>{title}: </strong>
      <input
        className="border ml-4 rounded-md py-1 px-3 w-full"
        type="text"
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          set(e.currentTarget.value)
        }
      />
    </label>
  );
};
