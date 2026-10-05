export type RegisterUserAttributes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
};

export type RegisterUserResponse = {
  message: string;
  /** false when Supabase requires the user to confirm their email first */
  sessionCreated: boolean;
};

export type LogUserInAttributes = {
  email: string;
  password: string;
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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
