import {
  apiCall,
  apiCreate,
  apiDelete,
  apiUpdate,
  emptyCallback,
} from "../ApiCall";

export const getAula = (departmentId: number, cb: (result: any) => void) => {
  apiCall(`department/${departmentId}/aula`, "", cb);
};

export const deleteAula = (
  departmentId: number,
  id: number,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`department/${departmentId}/aula/${id}`, cb);
};

export const updateAula = (
  departmentId: number,
  id: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiUpdate(`department/${departmentId}/aula/${id}`, cb, body);
};

export const createAula = (
  departmentId: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiCreate(`department/${departmentId}/aula`, cb, body);
};
