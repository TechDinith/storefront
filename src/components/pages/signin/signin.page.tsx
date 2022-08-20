import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AuthenticationForm from "../../sections/authentication/authenticationForm.section";
import simg1 from "../../../images/simg1.jpg";
import { iSignIn } from "./signin.interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const fields = ["email", "password"];
export default function SignInSide({ authProps, setNotify }: iSignIn) {
  const navigate = useNavigate();
  //handle delete if user deleted by the admin
  useEffect(() => {
    if (authProps.authUser) navigate(1);
  }, [authProps.authUser, navigate]);
  return (
    <Grid item xs={10} mt="4%">
      <Grid container>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url( ${simg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <AuthenticationForm
            setNotify={setNotify}
            fields={fields}
            btnText="Sign In"
            authProps={authProps}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
