import { iProducts } from "../../templates/product-details/interface.productdetails";

export interface iDashboard {
  products: iProducts[] | [];
}

export interface iDashboardContent {
  products: iProducts[] | [];
  state: any;
  sectionName: string;
}
