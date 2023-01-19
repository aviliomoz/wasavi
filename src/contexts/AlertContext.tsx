import { createContext, useReducer } from "react";

// Types
import { Alert } from "../types/interfaces";

interface State {
  alert: Alert;
}

interface Context {
  state: State;
  showAlertBox: (alert: Alert) => void;
  closeAlertBox: () => void;
}

interface Provider {
  children: JSX.Element | JSX.Element[];
}

type Action = { type: "SHOW"; payload: Alert } | { type: "CLOSE" };

const initialState: State = {
  alert: {
    type: undefined,
    message: undefined,
  },
};

export const AlertContext = createContext<Context>({} as Context);

const AlertReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SHOW":
      return { alert: action.payload };

    case "CLOSE":
      return initialState;

    default:
      return state;
  }
};

export const AlertContextProvider = ({ children }: Provider) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlertBox = (alert: Alert) => {
    dispatch({ type: "SHOW", payload: alert });

    setTimeout(() => {
      dispatch({ type: "CLOSE" });
    }, 4000);
  };

  const closeAlertBox = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <AlertContext.Provider value={{ state, showAlertBox, closeAlertBox }}>
      {children}
    </AlertContext.Provider>
  );
};
