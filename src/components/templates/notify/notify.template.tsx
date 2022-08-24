import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { iSnackBar, SnackbarMessage } from "./notify.interfaces";

export default function ConsecutiveSnackbars({
  message,
  snackPack,
  setSnackPack,
}: iSnackBar) {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (snackPack) {
      if (snackPack.length && !messageInfo) {
        setMessageInfo({ ...snackPack[0] });
        setSnackPack((prev: any) => prev.slice(1));
        setOpen(true);
      } else if (snackPack.length && messageInfo && open) {
        setOpen(false);
      }
    }
  }, [snackPack, messageInfo, open, setSnackPack]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        onClose={handleClose}
        severity={message ? message.severity : "info"}
        sx={{ width: "100%" }}
      >
        {message ? message.message : "Notification"}
      </Alert>
    </Snackbar>
  );
}
