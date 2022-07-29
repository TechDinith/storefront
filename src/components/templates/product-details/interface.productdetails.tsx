import { iDialog } from "../dialog/dialog.interface";
import { iNotifyProps } from "../notify/notify.interfaces";

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
  category: string;
}

export interface iCategory {
  id: string;
  image: any;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: string | undefined;
  category: string;
  orderedOn?: string;
  addedOn?: string;
}

export interface iLatest {
  id: string;
  image: any;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: string | undefined;
  category: string;
  orderedOn?: string;
  addedOn?: string;
}

export interface iProdDetails {
  notifyProps: iNotifyProps;
  countProps?: iCount;
  dialogProps?: iDialog;
  cart: iCart | iCategory | iLatest;
  isCart?: boolean;
  preview: boolean;
  latest?: boolean;
}

export interface iProducts {
  id: string;
  image: string | null;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string;
  price: string;
  category: string;
  enteredOn: string;
}
