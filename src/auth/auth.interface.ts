export interface iAuthProps {
  auth: any[] | null | [];
  setAuth: any;
}

export interface iSignUpUser {
  name: string;
  email: string;
  password: string;
}

export enum status {
  success = "success",
  error = "error",
}
