import { User } from "firebase/auth";

export interface iAuthProps {
  authUser: User | null | undefined;
  setAuthUser: any;
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
