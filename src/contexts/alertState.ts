import { atom } from "recoil";

// Types
import { Alert } from "../types/interfaces";

export const alertState = atom<Alert>({
  key: "alertState",
  default: {
    type: null,
    message: undefined,
  },
});
