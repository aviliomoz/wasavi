import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export const useAlert = () => {
  const {
    state: { alert },
    showAlertBox,
    closeAlertBox,
  } = useContext(AlertContext);

  return { alert, showAlertBox, closeAlertBox } as const;
};
