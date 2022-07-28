import { iAuthProps } from "../../../auth/auth.interface";
import { iNotifyProps } from "../../templates/notify/notify.interfaces";

export interface iAuthentication {
  fields: string[];
  btnText: string;
  notifyProps?: iNotifyProps;
  authProps: iAuthProps;
}
