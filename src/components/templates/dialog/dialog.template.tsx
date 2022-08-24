import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { iDialog } from "./dialog.interface";

export default function AlertDialog({
  openDialog,
  setOpenDialog,
  attributes,
}: iDialog) {
  const handleClose = () => {
    setOpenDialog({ value: false, id: "" });
  };

  return (
    <div>
      <Dialog
        open={openDialog?.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="orangered" id="alert-dialog-title">
          {attributes?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {attributes?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClose}>
            {attributes?.noBtn}
          </Button>
          <Button color="error" onClick={attributes?.yesFunction} autoFocus>
            {attributes?.yesBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
