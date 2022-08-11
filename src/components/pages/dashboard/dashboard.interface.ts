import { iDialog } from "../../templates/dialog/dialog.interface";
import { iProducts } from "../../templates/product-details/interface.productdetails";

export interface iDashboard {
  products: iProducts[] | [];
  dialogProps: iDialog;
}

export interface iDashboardContent {
  products: iProducts[] | [];
  state: any;
  sectionName: string;
  dialogProps: iDialog;
}
