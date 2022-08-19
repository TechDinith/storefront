import { iAuthProps } from "../../../auth/auth.interface";
import { iDialog } from "../../templates/dialog/dialog.interface";
import { iCount } from "../../templates/product-details/interface.productdetails";

export interface iCartPage {
  countProps: iCount;
  setNotify: any;
  dialogProps?: iDialog;
  authProps?: iAuthProps;
}
