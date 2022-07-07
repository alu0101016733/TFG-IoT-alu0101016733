import { apiCall, apiCreate, apiDelete, emptyCallback } from "../ApiCall";

export const getTelegramWarning = (
  chatId: number,
  cb: (result: any) => void
) => {
  apiCall(`telegram/${chatId}/warning`, "", cb);
};

export const deleteTelegramWarning = (
  chatId: number,
  warningId: number,
  cb: (result: any) => void = emptyCallback
) => {
  apiDelete(`telegram/${chatId}/warning/${warningId}`, cb);
};

export const createTelegramWarning = (
  chatId: number,
  cb: (result: any) => void = emptyCallback,
  body: any
) => {
  apiCreate(`telegram/${chatId}/warning`, cb, body);
};
