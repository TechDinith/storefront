export interface iDialog {
  openDialog: boolean;
  setOpenDialog: any;
  attributes?: {
    title: string;
    content: string;
    yesBtn: string;
    yesFunction: () => void;
    noBtn: string;
  };
}
