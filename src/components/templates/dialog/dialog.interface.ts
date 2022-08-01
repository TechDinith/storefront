export interface iDialog {
  openDialog: iOpenDialog;
  setOpenDialog: any;
  attributes?: {
    title: string;
    content: string;
    yesBtn: string;
    yesFunction: () => void;
    noBtn: string;
  };
}

export interface iOpenDialog {
  value: boolean;
  id?: string;
}
