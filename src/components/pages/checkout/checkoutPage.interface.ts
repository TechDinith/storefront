import { iAuthProps } from "../../../auth/auth.interface";
import { iCount } from "../../templates/product-details/interface.productdetails";

export interface iCheckoutPage {
  authProps: iAuthProps;
  setNotify: any;
  countProps: iCount;
}
