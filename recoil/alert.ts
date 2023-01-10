import { atom } from "recoil";

// Types
import { Alert } from "../utils/interfaces";

export const alertState = atom<Alert>({
  key: "alertState",
  default: {
    type: null,
    message: undefined,
  },
});
