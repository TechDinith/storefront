import { iDialog } from "../../templates/dialog/dialog.interface";
import { iNotifyProps } from "../../templates/notify/notify.interfaces";
import { iCount } from "../../templates/product-details/interface.productdetails";

export interface iCartPage {
  countProps: iCount;
  notifyProps: iNotifyProps;
  dialogProps?: iDialog;
}
