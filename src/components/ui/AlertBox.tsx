import { useRecoilValue } from "recoil";

// Utils
import { alertState } from "../../contexts/alertState";

// Icons
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

// Enums
import { AlertEnum } from "../../types/enums";

export const AlertBox = () => {
  const alert = useRecoilValue(alertState);

  if (!alert.message) return <></>;

  return (
    <div
      className={`absolute bottom-5 right-5 py-4 px-6 rounded-md text-white font-light flex items-center space-x-3 ${
        alert.type === AlertEnum.ERROR
          ? "bg-red-400"
          : alert.type === AlertEnum.SUCCESS
          ? "bg-emerald-400"
          : ""
      }`}
    >
      {alert.type === AlertEnum.ERROR && <FaExclamationCircle />}
      {alert.type === AlertEnum.SUCCESS && <FaCheck />}
      <p>{alert.message}</p>
    </div>
  );
};
