export interface iLatestProps {
  setNotify: any;
  latestProducts: iLatest[];
}

export interface iLatest {
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
  urlList?: any;
  prodId?: string;
  enteredOn?: string;
}
