import { iNotifyProps } from "../../templates/notify/notify.interfaces";
import { iProducts } from "../../templates/product-details/interface.productdetails";

export interface iHome {
  notifyProps: iNotifyProps;
  products: iProducts[];
}
