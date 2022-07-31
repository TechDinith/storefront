import { iNotifyProps } from "../../templates/notify/notify.interfaces";

export interface iLatestProps {
  notifyProps: iNotifyProps;
  latestProducts: iLatest[];
}

export interface iLatest {
  id: string;
  image: any;
  isColor: boolean;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: number | undefined;
  desc: string;
  category: string;
  orderedOn?: string;
  addedOn?: string;
}
