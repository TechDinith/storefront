import { iAuthProps } from "../../../auth/auth.interface";
import { iNotifyProps } from "../notify/notify.interfaces";
import { iCount } from "../product-details/interface.productdetails";

export interface iNavbar {
  countProps: iCount;
  notifyProps: iNotifyProps;
  authProps: iAuthProps;
}
