import { iDialog } from "../../templates/dialog/dialog.interface";

export interface iDashboard {
  dialogProps: iDialog;
}

export interface iDashboardContent {
  state: any;
  sectionName: string;
  dialogProps: iDialog;
  authUser: any;
}

export interface iAdminLogin {}
