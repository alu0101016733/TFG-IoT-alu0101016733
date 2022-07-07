import {
  apiCall,
  apiCreate,
  apiDelete,
  apiUpdate,
  emptyCallback,
} from "../ApiCall";

export const getTelegram = (cb: (result: any) => void) => {
  apiCall("telegram", "", cb);
};

export const deleteTelegram = (
  id: number,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`telegram/${id}`, cb);
};

export const updateTelegram = (
  id: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiUpdate(`telegram/${id}`, cb, body);
};

export const createTelegram = (
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiCreate(`telegram`, cb, body);
};
