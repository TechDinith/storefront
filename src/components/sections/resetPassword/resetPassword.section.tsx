import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { iResetPassword } from "./resetPassword.section.interface";
import { resetPassword } from "../../../auth/firebase/firebase.users.functions";
import { status } from "../../../auth/auth.interface";

export default function ResetPassword({
  authProps,
  setNotify,
}: iResetPassword) {
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required!"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit = (data: any) => {
    resetPassword(data.email).then((res) => {
      if (res.status === status.success) {
        setNotify({
          message: res.data,
          severity: res.status,
        });

        setTimeout(() => {
          navigate("/");
        }, 10);
      } else {
        setNotify({
          message: res.data,
          severity: res.status,
        });
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, color: "white" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="orange">
          Reset Password
        </Typography>

        <Box sx={{ mt: 1, width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  margin="normal"
                  type="email"
                  fullWidth
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  {...field}
                  error={Boolean(errors.email)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Email is Required",
                },
              }}
            />
            {errors.email && (
              <Typography color="red" variant="caption">
                {errors.email.message as any}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth color="info">
              Reset
            </Button>
          </form>

          <Grid container mt="1%" justifyContent="center">
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "left" }}>
              <Link to="/login">Sign In</Link>
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "right" }}>
              <Link to="/singup">Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
