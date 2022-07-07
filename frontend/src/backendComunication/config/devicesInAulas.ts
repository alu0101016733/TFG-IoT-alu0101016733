import {
  apiCall,
  apiCreate,
  apiDelete,
  apiUpdate,
  emptyCallback,
} from "../ApiCall";

export const getDevicesInAula = (
  departmentId: number,
  aulaId: number,
  cb: (result: any) => void
) => {
  apiCall(`department/${departmentId}/aula/${aulaId}/device`, "", cb);
};

export const createDevicesInAula = (
  departmentId: number,
  aulaId: number,
  cb: (result: any) => void,
  body: any
) => {
  apiCreate(`department/${departmentId}/aula/${aulaId}/device`, cb, body);
};

export const deleteDevicesInAula = (
  departmentId: number,
  aulaId: number,
  eui: string,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`department/${departmentId}/aula/${aulaId}/device/${eui}`, cb);
};

export const updateDevicesInAula = (
  departmentId: number,
  aulaId: number,
  eui: string,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiUpdate(
    `department/${departmentId}/aula/${aulaId}/device/${eui}`,
    cb,
    body
  );
};
