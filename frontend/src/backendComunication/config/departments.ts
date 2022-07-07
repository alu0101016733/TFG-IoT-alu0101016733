import {
  apiCall,
  apiCreate,
  apiDelete,
  apiUpdate,
  emptyCallback,
} from "../ApiCall";

export const getDepartment = (cb: (result: any) => void) => {
  apiCall("department", "", cb);
};

export const deleteDepartment = (
  id: number,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`department/${id}`, cb);
};

export const updateDepartment = (
  id: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiUpdate(`department/${id}`, cb, body);
};

export const createDepartment = (
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiCreate(`department`, cb, body);
};
