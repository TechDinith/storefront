import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Notify = ({ handleClose, open, message, severity }: any) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity || "info"}
        sx={{ width: "100%" }}
      >
        {message ? message : "Notification"}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
