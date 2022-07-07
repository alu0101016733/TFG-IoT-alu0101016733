import { apiCall } from "../ApiCall";

export const getSensorsInAula = (
  departmentId: number,
  aulaId: number,
  cb: (result: any) => void
) => {
  apiCall(`department/${departmentId}/aula/${aulaId}/sensors`, "", cb);
};
