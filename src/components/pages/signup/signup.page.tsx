import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AuthenticationForm from "../../sections/authentication/authenticationForm.section";
import simg1 from "../../../images/simg1.jpg";
import { iSignUp } from "./signup.interface";

export default function SignUpSide({ setNotify, authProps }: iSignUp) {
  const fields = ["name", "email", "password"];

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
            isSignUp={true}
            authProps={authProps}
            setNotify={setNotify}
            fields={fields}
            btnText="Sign Up"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
