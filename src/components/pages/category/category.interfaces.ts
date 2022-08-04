import { iNotifyProps } from "../../templates/notify/notify.interfaces";
import { iCount } from "../../templates/product-details/interface.productdetails";

export interface iCategories {
  countProps: iCount;
  notifyProps: iNotifyProps;
  products: iCategory[];
}

export interface iCategory {
  id: string;
  image: any;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: string | undefined;
  desc: string;
  category: string;
  orderedOn?: string;
  addedOn?: string;
  quantity?: string;
}
