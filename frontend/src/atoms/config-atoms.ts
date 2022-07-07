import { atom } from "recoil";

// update interval in seconds
export const configUpdateIntervalAtom = atom<number>({
  key: "update-interval-config",
  default: 5,
});
