import { SubmitHandler } from "react-hook-form";
import { iAuthProps } from "../../../auth/auth.interface";
import { iCart } from "../../templates/product-details/interface.productdetails";

export interface iAddressForm {
  onSubmit: SubmitHandler<any>;
  deliveryDetails: any;
  authProps: iAuthProps;
}

export interface iReview {
  deliveryDetails: any;
  products: iCart[];
}
