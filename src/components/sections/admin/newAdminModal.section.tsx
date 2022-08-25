import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { iNewAdminModal } from "./interface.admin.section";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useState } from "react";
import {
  addAdmin,
  getAdmins,
} from "../../../auth/firebase/firebase.admin.functions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is Required!"),
});

export default function NewAdminModal({
  open,
  setOpen,
  setNotify,
}: iNewAdminModal) {
  const [childOpen, setChildOpen] = useState<boolean>(false);
  const [adminLink, setAdminLink] = useState<string>("");

  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    setDisabled(false);
    setOpen(false);
    setChildOpen(false);
  };
  const formOptions = { resolver: yupResolver(formSchema), defaultValues: {} };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    setDisabled(true);
    getAdmins().then((admins: any) => {
      let exist = false;
      admins.forEach((doc: any) => {
        if (Object.values(doc.data()).includes(data.email)) {
          exist = true;
          setNotify({
            message: "Email already exist!",
            severity: "error",
          });
          setDisabled(false);
        }
      });

      if (!exist) {
        addAdmin(data.email, data.role)
          .then((admin: any) => {
            // setAdminLink("http://localhost:3000/admin/" + admin.id);//local
            setAdminLink(
              "https://test-projects-b10ec.web.app/admin/" + admin.id
            ); //hosting

            setChildOpen(true);
          })
          .catch((err) => {
            setNotify({
              message: err.message,
              severity: "error",
            });
            setDisabled(false);
          });
      }
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box sx={style}>
          <Grid container justifyContent="center" color="white">
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                color="inherit"
                variant="h6"
                component="h2"
                textAlign="center"
              >
                New Admin
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      autoFocus
                      variant="standard"
                      {...field}
                      error={Boolean(errors["email"])}
                    />
                  )}
                />

                {errors["email"] && (
                  <Typography color="red" variant="caption">
                    {errors["email"]?.message as any}
                  </Typography>
                )}

                <Box my={2}>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue="admin"
                    render={({ field }) => (
                      <TextField fullWidth select label="Category" {...field}>
                        <MenuItem value="pedros-admin">Pedros Admin</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </TextField>
                    )}
                  />
                </Box>

                <Box width="100%" display="flex" justifyContent="right">
                  <IconButton
                    sx={{ mt: 3 }}
                    color="error"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    disabled={disabled}
                    type="submit"
                    sx={{ mt: 3 }}
                    color="success"
                  >
                    <EventAvailableIcon />
                  </IconButton>
                </Box>
              </form>
            </Grid>
          </Grid>
          <Modal
            open={childOpen}
            onClose={handleClose}
            sx={{ overflow: "scroll" }}
          >
            <Box sx={style}>
              <Grid container justifyContent="center" color="white">
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    color="inherit"
                    variant="h6"
                    component="h2"
                    textAlign="center"
                  >
                    Login Link
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    color="orange"
                    variant="caption"
                    textAlign="center"
                  >
                    {adminLink}
                  </Typography>
                  <br />
                  <Typography
                    color="inherit"
                    variant="caption"
                    textAlign="center"
                  >
                    Please send this link to the relevant person to use this
                    link to login
                  </Typography>

                  <Box width="100%" display="flex" justifyContent="right">
                    <IconButton
                      sx={{ mt: 3 }}
                      color="info"
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </div>
  );
}
