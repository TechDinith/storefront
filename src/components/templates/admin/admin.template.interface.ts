import { iProducts } from "../product-details/interface.productdetails";

export interface iDataTable {
  rows: any[];
  sectionName: string;
}

export interface iUpdateProduct {
  modalProps: { openModal: boolean; setOpenModal: any };
  product: iProducts | any;
}
