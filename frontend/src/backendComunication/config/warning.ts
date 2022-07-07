import {
  apiCall,
  apiCreate,
  apiDelete,
  apiUpdate,
  emptyCallback,
} from "../ApiCall";

export const getWarning = (cb: (result: any) => void) => {
  apiCall("config-warning", "", cb);
};

export const deleteWarning = (
  id: number,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`config-warning/${id}`, cb);
};

export const updateWarning = (
  id: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiUpdate(`config-warning/${id}`, cb, body);
};

export const createWarning = (
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiCreate(`config-warning`, cb, body);
};
