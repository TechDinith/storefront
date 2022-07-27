export interface iCount {
  count: any[];
  setCount: any;
}

export interface iCart {
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
  countProps?: iCount;
  cart: iCart | iCategory | iLatest;
  isCart?: boolean;
  preview: boolean;
  latest?: boolean;
}
