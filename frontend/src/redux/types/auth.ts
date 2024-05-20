export type RegisterUserAttributes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
};

export type RegisterUserResponse = {
  message: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
};

export type LogUserInAttributes = {
  email: string;
  password: string;
};

export interface User {
  __v: number;
  _id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  updatedAt: string;
}

export type LogUserInResponse = {
  message: string;
  user: User;
  accessToken: string;
};

export type ErrorResponse = {
  errorCode: any;
  success: boolean;
  status_code: number;
  message: string;
  data: [];
};
