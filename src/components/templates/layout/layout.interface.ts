import { iDialog } from "../dialog/dialog.interface";
import { iNotifyProps } from "../notify/notify.interfaces";
import { iProducts } from "../product-details/interface.productdetails";

export interface iLayout {
  products: iProducts[] | [];
  dialogProps: iDialog;
  notifyProps: iNotifyProps;
}
