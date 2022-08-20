import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import simg1 from "../../../images/simg1.jpg";
import ResetPassword from "../../sections/resetPassword/resetPassword.section";
import { iResetPasswordPage } from "./resetPassword.page.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage({
  authProps,
  setNotify,
}: iResetPasswordPage) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authProps.auth && authProps.auth[0]) navigate("/");
  }, [authProps.auth, navigate]);

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
          <ResetPassword authProps={authProps} setNotify={setNotify} />
        </Grid>
      </Grid>
    </Grid>
  );
}
