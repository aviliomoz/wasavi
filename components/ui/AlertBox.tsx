import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

// Utils
import { cleanAlert } from "../../utils/slices/alertSlice";

const AlertBox = () => {
  const dispatch = useDispatch();

  const { alert } = useSelector((state: any) => state.alert);

  useEffect(() => {
    if (alert)
      setTimeout(() => {
        dispatch(cleanAlert({}));
      }, 4000);
  }, [alert]);

  return (
    <>
      {alert && (
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
      )}
    </>
  );
};

export default AlertBox;
