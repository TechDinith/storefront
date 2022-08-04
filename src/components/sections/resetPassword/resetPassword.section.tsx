import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import ConsecutiveSnackbars from "../../templates/notify/notify.template";
import { iResetPassword } from "./resetPassword.section.interface";

export default function ResetPassword({
  authProps,
  notifyProps,
}: iResetPassword) {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required!")
      .test("match", "User does not Exist!", function (email) {
        return email === "test@test.com";
      }),
    password: Yup.string()
      .required("Password is Required!")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: Yup.string()
      .required("Confirm Password is Required!")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit = (data: any) => {
    //reset auth password in the database acording to email
    console.log(data);
    notifyProps.handleNotificationClick({
      message: "Password Changed!",
      severity: "success",
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
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  margin="normal"
                  type="password"
                  fullWidth
                  label="Password"
                  autoComplete="password"
                  {...field}
                  error={Boolean(errors.password)}
                />
              )}
              rules={{
                // pattern: {
                //   value:
                //     fieldName === "password"
                //       ? /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                //       : /^/,
                //   message: "Password should contained Valid",
                // },
                required: {
                  value: true,
                  message: "Password is Required",
                },
              }}
            />
            {errors.password && (
              <Typography color="red" variant="caption">
                {errors.password.message as any}
              </Typography>
            )}
            <Controller
              name="confirmPwd"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  margin="normal"
                  type="password"
                  fullWidth
                  label="Confirm Password"
                  autoComplete="confirmPwd"
                  {...field}
                  error={Boolean(errors.confirmPwd)}
                />
              )}
              rules={{
                // pattern: {
                //   value:
                //     fieldName === "password"
                //       ? /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                //       : /^/,
                //   message: "Password should contained Valid",
                // },
                required: {
                  value: true,
                  message: "Confirm password is Required",
                },
              }}
            />
            {errors.confirmPwd && (
              <Typography color="red" variant="caption">
                {errors.confirmPwd.message as any}
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
      <ConsecutiveSnackbars
        message={notifyProps?.message}
        setSnackPack={notifyProps?.setSnackPack}
        snackPack={notifyProps?.snackPack}
      />
    </>
  );
}
