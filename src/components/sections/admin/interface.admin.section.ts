import { iDialog } from "../../templates/dialog/dialog.interface";

export interface EnhancedTableToolbarProps {
  numSelected: number;
  sectionName: string;
}

export interface iOrder {
  id: string;
  orderedDate: string;
  deliveredDate: string | null;
  name: string;
  products: any[];
  image: any[];
  contacts: string;
  shipTo: string;
  paymentMethod: string;
  totalAmount: number;
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
  dialogProps: iDialog;
}

export interface iUserSection {
  sectionName: string;
  dialogProps: iDialog;
}
export interface iAdminSection {
  sectionName: string;
  dialogProps: iDialog;
  authUser: iAdmin;
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
  authId: string;
}

export interface iNewAdminModal {
  open: any;
  setOpen: any;
  setNotify: any;
}
