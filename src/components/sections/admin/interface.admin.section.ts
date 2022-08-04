import { iProducts } from "../../templates/product-details/interface.productdetails";

export interface EnhancedTableToolbarProps {
  numSelected: number;
  sectionName: string;
}

export interface iOrder {
  id: string;
  date: string;
  name: string;
  shipTo: string;
  products: string;
  paymentMethod: string;
  amount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof iOrder;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  rows: any[];
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof iOrder
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export type Order = "asc" | "desc";

export interface iOrderSection {
  sectionName: string;
}

export interface iProductsSection {
  sectionName: string;
  products: iProducts[] | [];
}
