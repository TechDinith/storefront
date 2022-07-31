import { iAuthProps } from "../../../auth/auth.interface";
import { iNotifyProps } from "../../templates/notify/notify.interfaces";
import { iCount } from "../../templates/product-details/interface.productdetails";

export interface iCheckoutPage {
  authProps: iAuthProps;
  notifyProps: iNotifyProps;
  countProps: iCount;
}
