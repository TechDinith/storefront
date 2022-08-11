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

export default function NewAdminModal({ open, setOpen }: iNewAdminModal) {
  const handleClose = () => setOpen(false);

  const formOptions = { resolver: yupResolver(formSchema), defaultValues: {} };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("data", data);
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
                    name="category"
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
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton type="submit" sx={{ mt: 3 }} color="success">
                    <EventAvailableIcon />
                  </IconButton>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
