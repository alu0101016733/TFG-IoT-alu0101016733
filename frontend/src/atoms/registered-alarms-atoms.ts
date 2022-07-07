import { atom } from "recoil";
// import localforage from "localforage";

// alarm ids are saved, that can afterwards be used to get
// the alarm information from the database (if time change to object and save alarms)
export const sensorWarningsAtom = atom<any[]>({
  key: "sensor-warnings",
  default: [],
});

export type configWarningsType = {
  errorCode?: number;
  message?: string;
};

// will be used to have configuration alarm states like a sensor cant be saved since its not defined
export const configWarningsAtom = atom<configWarningsType[]>({
  key: "config-warnings",
  default: [],
});
