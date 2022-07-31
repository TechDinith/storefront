import { iAuthProps } from "../../../auth/auth.interface";
import { iNotifyProps } from "../../templates/notify/notify.interfaces";

export interface iCheckoutPage {
  authProps: iAuthProps;
  notifyProps: iNotifyProps;
}
