import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box/Box";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Avatar, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { iAdminLogin } from "./dashboard.interface";
import NotifyUse from "../../templates/notify/notify.template.use";
import { iMessage } from "../../templates/notify/notify.interfaces";
import { signInWIthFirebaseEmailLink } from "../../../auth/firebase/auth.email.link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../auth/firebase/firebase.config";
import { getAdmins } from "../../../auth/firebase/firebase.admin.functions";

export default function AdminLogin({}: iAdminLogin) {
  const [notify, setNotify] = useState<iMessage>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const params: any = useParams();
  const navigate = useNavigate();
  const { state }: any = useLocation();

  useEffect(() => {
    getAdmins().then((admins: any) => {
      let exist = false;
      admins.forEach((doc: any) => {
        if (Object.values(doc.data()).includes(params.id)) {
          exist = true;
        }
      });

      if (!exist) {
        navigate("/notfound");
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin/dashboard", {
          state: {
            role: state && state.role && state.role,
          },
        });
      } else {
        navigate("/notfound");
      }
    });
  }, [params.id, navigate]);

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required!"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsDisabled(true);
    console.log(data);
    signInWIthFirebaseEmailLink(data.email, state && state.role)
      .then(() => {
        setNotify({
          message: "Email Link sent to relevant email address!",
          severity: "info",
        });
      })
      .catch((error) => {
        setNotify({ message: error, severity: "error" });
        setIsDisabled(false);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={3} justifyContent="center">
        <Box component={Paper} mt={10} py="10%">
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar>
              <AdminPanelSettingsIcon color="action" />
            </Avatar>
          </Grid>

          <Grid item xs={12} justifyContent="center" display="flex">
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

              <Box width="100%" display="flex" justifyContent="right">
                <IconButton
                  disabled={isDisabled}
                  type="submit"
                  sx={{ mt: 3 }}
                  color="success"
                >
                  <LoginIcon />
                </IconButton>
              </Box>
            </form>
          </Grid>
        </Box>
      </Grid>
      <NotifyUse messageProps={notify} />
    </Grid>
  );
}
