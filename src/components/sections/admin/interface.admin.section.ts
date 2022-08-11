import { iDialog } from "../../templates/dialog/dialog.interface";
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
  dialogProps: iDialog;
}

export interface iProductsSection {
  sectionName: string;
  products: iProducts[] | [];
  dialogProps: iDialog;
}

export interface iUserSection {
  sectionName: string;
  users: iUser[] | [];
  dialogProps: iDialog;
}
export interface iAdminSection {
  sectionName: string;
  admins: iAdmin[] | [];
  dialogProps: iDialog;
}

export interface iUser {
  id: string;
  joinedDate: string;
  name: string;
  email: string;
}
export interface iAdmin {
  id: string;
  assignedDate: string;
  role: string;
  email: string;
}

export interface iNewAdminModal {
  open: any;
  setOpen: any;
}
