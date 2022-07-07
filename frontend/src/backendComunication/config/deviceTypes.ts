import { apiCall } from "../ApiCall";

export const getDeviceTypes = (cb: (result: any) => void) => {
  apiCall("device-types", "", cb);
};
