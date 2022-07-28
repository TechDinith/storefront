export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface iSnackBar {
  message: iMessage;
  snackPack: any;
  setSnackPack: any;
}

export interface iMessage {
  message: string;
  severity: any;
}

export interface iNotifyProps {
  handleNotificationClick: (message: iMessage) => void;
  message: iMessage;
  snackPack: any;
  setSnackPack: any;
}
