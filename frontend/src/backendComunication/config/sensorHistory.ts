import { DAY_IN_MILISECONDS } from "../../usefulConstants";
import { apiCall } from "../ApiCall";

export const getSensorsHistory = (
  sensorId: string,
  eui: string | undefined,
  cb: (result: any) => void,
  aulaId: number | undefined = undefined,
  lastHours: number | undefined = DAY_IN_MILISECONDS, // from now minus this number
  limitBy: number | undefined = undefined // limits result to be older than this number
) => {
  const filter = `filter=triggeredTime||gt||${
    new Date().getTime() - lastHours
  }${
    limitBy
      ? "&filter=triggeredTime||lt||" +
        Math.round(new Date().getTime() - limitBy)
      : ""
  }`;
  if (aulaId !== undefined) {
    apiCall(`sensor/${sensorId}/aula/${aulaId}?${filter}`, "", cb);
  } else if (eui) {
    apiCall(`sensor/${sensorId}/${eui}?${filter}`, "", cb);
  }
};
