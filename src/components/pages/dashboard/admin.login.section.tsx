import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box/Box";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Avatar, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function AdminLogin() {
  const params: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id !== "1") {
      navigate("/notfound");
    }
  }, [params.id]);
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required!")
      .test("match", "Unauthorized!", function (email) {
        return email === "admin@admin.com";
      }),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    navigate("/admin/dashboard", {
      state: { id: params.id, email: data.email },
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
                <IconButton type="submit" sx={{ mt: 3 }} color="success">
                  <LoginIcon />
                </IconButton>
              </Box>
            </form>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
