import { iAuthProps } from "../../../auth/auth.interface";
import { iCategory } from "../../pages/category/category.interfaces";
import { iLatest } from "../../sections/latest/latest.interface";
import { iDialog } from "../dialog/dialog.interface";

export interface iCount {
  count: any[];
  setCount: any;
}

export interface iCart {
  id: string;
  orderedOn: string;
  addedOn: string;
  image: any;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: string | undefined;
  desc: string;
  category: string;
  quantity?: string;
  urlList?: any;
  prodId?: string;
  authId?: string;
}

export interface iProdDetails {
  authProps?: iAuthProps;
  setNotify: any;
  countProps?: iCount;
  dialogProps?: iDialog;
  cart: iCart | iCategory | iLatest;
  isCart?: boolean;
  preview: boolean;
  latest?: boolean;
  handleClickCloseSearchResult?: () => void;
}

export interface iProducts {
  id: string;
  image: string | null;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string;
  price: string | undefined;
  desc: string;
  category: string;
  enteredOn: string;
  urlList?: any;
  prodId?: string;
}
