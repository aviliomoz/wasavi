import { useRecoilValue } from "recoil";

// Utils
import { alertState } from "../../recoil/alert";

// Icons
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

export const AlertBox = () => {
  const alert = useRecoilValue(alertState);

  if (!alert.message) return <></>;

  return (
    <div
      className={`absolute bottom-5 right-5 py-4 px-6 rounded-md text-white font-light flex items-center space-x-3 ${
        alert.type === "error"
          ? "bg-red-400"
          : alert.type === "success"
          ? "bg-emerald-400"
          : ""
      }`}
    >
      {alert.type === "error" && <FaExclamationCircle />}
      {alert.type === "success" && <FaCheck />}
      <p>{alert.message}</p>
    </div>
  );
};
