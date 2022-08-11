import { iDialog } from "../dialog/dialog.interface";
import { iProducts } from "../product-details/interface.productdetails";

export interface iLayout {
  products: iProducts[] | [];
  dialogProps: iDialog;
}
