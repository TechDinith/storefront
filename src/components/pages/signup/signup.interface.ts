import { iAuthProps } from "../../../auth/auth.interface";
import { iNotifyProps } from "../../templates/notify/notify.interfaces";

export interface iSignUp {
  authProps: iAuthProps;
  notifyProps: iNotifyProps;
}
