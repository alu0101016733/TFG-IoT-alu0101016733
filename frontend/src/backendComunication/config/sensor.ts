import { apiCall } from "../ApiCall";

export const getSensor = (cb: (result: any) => void) => {
  apiCall("sensor", "", cb);
};

export const getSensorId = (cb: (result: any) => void) => {
  apiCall("sensor?fields=id", "", cb);
};
