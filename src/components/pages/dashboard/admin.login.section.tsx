import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Fragment, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";

export default function AdminLogin() {
  const params: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id !== "1") {
      navigate("/notfound");
    }
  }, [params.id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Grid container justifyContent="center" mt={5}>
      <Grid item xs={4} component={Paper} justifyContent="center" py={8}>
        <Grid item xs={12} justifyContent="center">
          <Typography
            variant="h4"
            gutterBottom
            color="inherit"
            textAlign="center"
          >
            Admin Login
          </Typography>
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
              rules={{
                required: {
                  value: true,
                  message: "Email is Required!",
                },
              }}
            />
            {errors["email"] && (
              <Typography color="red" variant="caption">
                {errors["email"]?.message as any}
              </Typography>
            )}

            <Box width="100%" display="flex" justifyContent="right">
              <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
