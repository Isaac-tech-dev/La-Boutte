export type ResponseData = null | [] | string | object;
export type Response = {
  status_code: string;
  message: string;
  Data: ResponseData;
};
export type RBSheetRef = {
  open: () => void;
  close: () => void;
  // Add other methods or properties if needed
};