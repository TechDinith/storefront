import { iAuthProps } from "../../../auth/auth.interface";

export interface iAuthentication {
  fields: string[];
  btnText: string;
  setNotify?: any;
  isSignUp?: boolean;
  authProps: iAuthProps;
}
