import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import { iAuthentication } from "./authentication.interface";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { capitalize } from "@mui/material/utils";
import {
  logInUsers,
  signupUsers,
} from "../../../auth/firebase/firebase.users.functions";
import { status } from "../../../auth/auth.interface";
import {
  deleteCartItemForAuthPages,
  processCart,
} from "../../../auth/firebase/firebase.cart.functions";
import { auth } from "../../../auth/firebase/firebase.config";

interface IFormInput {
  email: string;
  password: string;
  name?: string;
  remember: boolean;
}

const AuthenticationForm = ({
  fields,
  btnText,
  setNotify,
  isSignUp,
  authProps,
}: iAuthentication) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    if (isSignUp) {
      signupUsers({
        email: data.email,
        password: data.password,
        name: data!.name!,
      }).then((res) => {
        console.log(res);

        if (res.status === status.success) {
          authProps.setAuthUser(res.data);
          setNotify({
            message: "Registration Successful!",
            severity: res.status,
          });

          let localCart = localStorage.getItem("cart");

          const jsonCart = localCart
            ? JSON.parse(typeof localCart === "string" ? localCart : "")
            : [];

          processCart(jsonCart).then((res) => {
            if (res.status === status.success) {
              setTimeout(() => {
                navigate(-1);
              }, 100);
            } else {
              console.log(res);
            }
          });
        } else {
          console.log(res);
          setNotify({
            message: res.data.errorMessage,
            severity: res.status,
          });
        }
      });
    } else {
      logInUsers(data.email, data.password).then((res) => {
        if (res.status === status.success) {
          console.log(res.data);
          authProps.setAuthUser(res.data);
          let localCart = localStorage.getItem("cart");

          const jsonCart = localCart
            ? JSON.parse(typeof localCart === "string" ? localCart : "")
            : [];

          processCart(jsonCart).then((res) => {
            if (res.status === status.success) {
              setTimeout(() => {
                navigate(-1);
              }, 100);
            } else {
              console.log(res);
            }
          });
        } else {
          console.log(res);
          setNotify({
            message: "Wrong Password!",
            severity: res.status,
          });
        }
      });
    }
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
          {btnText}
        </Typography>

        <Box sx={{ mt: 1, width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((fieldName: any, i: number) => {
              return (
                <Fragment key={i}>
                  <Controller
                    name={fieldName}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        type={
                          fieldName === "email" || fieldName === "password"
                            ? fieldName
                            : null
                        }
                        fullWidth
                        label={capitalize(fieldName)}
                        autoComplete={fieldName}
                        autoFocus={i === 0}
                        {...field}
                        error={Boolean(
                          fieldName === errors.email ||
                            fieldName === errors.name ||
                            fieldName === errors.password
                        )}
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
                        message: capitalize(fieldName) + " is Required",
                      },
                    }}
                  />
                  {fieldName === "email"
                    ? errors.email && (
                        <Typography color="red" variant="caption">
                          {errors.email.message}
                        </Typography>
                      )
                    : fieldName === "password"
                    ? errors.password && (
                        <Typography color="red" variant="caption">
                          {errors.password.message}
                        </Typography>
                      )
                    : fieldName === "name"
                    ? errors.name && (
                        <Typography color="red" variant="caption">
                          {errors.name.message}
                        </Typography>
                      )
                    : null}
                </Fragment>
              );
            })}
            <Box>
              <FormControlLabel
                control={
                  <Controller
                    name="remember"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => <Checkbox {...field} />}
                  />
                }
                label="Remember me"
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth color="info">
              {btnText}
            </Button>
          </form>

          <Grid container mt="1%" justifyContent="center">
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "left" }}>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "right" }}>
              <Link
                href={
                  String(btnText).toLowerCase() !== "sign up"
                    ? "/signup"
                    : "/login"
                }
                variant="body2"
              >
                {String(btnText).toLowerCase() !== "sign up"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AuthenticationForm;
