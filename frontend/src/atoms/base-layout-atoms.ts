import { atom } from "recoil";
import { RightSidebarOpenStates } from "../modules/Layout/RightSidebar";

export const rightSidebarAtom = atom<RightSidebarOpenStates>({
  key: "right-sidebar-state",
  default: undefined,
});
