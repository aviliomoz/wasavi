import { FaPlusCircle } from "react-icons/fa";

// Utils
import { getTargetValue } from "../../utils/enums";

// Types
import { TargetEnum } from "../../utils/enums";

interface Props {
  target: TargetEnum;
}

export const AddButton = ({ target }: Props) => {
  return (
    <button className="bg-emerald-500 text-white font-normal text-sm px-12 py-1 flex items-center rounded-md space-x-2">
      <i>
        <FaPlusCircle />
      </i>
      <span>{`Nuevo ${getTargetValue(target)}`}</span>
    </button>
  );
};
