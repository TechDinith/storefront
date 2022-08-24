import { iAuthProps } from "../../../auth/auth.interface";
import { iCount, iProducts } from "../product-details/interface.productdetails";

export interface iNavbar {
  countProps: iCount;
  setNotify: any;
  authProps: iAuthProps;
  products: iProducts[];
  categories: string[];
}
