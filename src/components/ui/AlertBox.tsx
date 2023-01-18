import { useRecoilValue } from "recoil";

// Utils
import { alertState } from "../../contexts/alertState";

// Icons
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

export const AlertBox = () => {
  const alert = useRecoilValue(alertState);

  if (!alert.message) return <></>;

  return (
    <div
      className={`absolute bottom-5 right-5 py-4 px-6 rounded-md text-white font-light flex items-center space-x-3 ${
        alert.type === "ERROR"
          ? "bg-red-400"
          : alert.type === "SUCCESS"
          ? "bg-emerald-400"
          : ""
      }`}
    >
      {alert.type === "ERROR" && <FaExclamationCircle />}
      {alert.type === "SUCCESS" && <FaCheck />}
      <p>{alert.message}</p>
    </div>
  );
};
