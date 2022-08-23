import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface IFormInput {
  email: string;
  name: string;
  info: string;
}

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  //handle contact form
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              variant="filled"
              {...field}
              label="Email"
              margin="dense"
              type="email"
              error={Boolean(errors.email)}
            />
          )}
          rules={{ required: { value: true, message: "Email is Required" } }}
        />
        {errors.email && (
          <Typography color="red" variant="caption">
            {errors.email.message}
          </Typography>
        )}
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="filled"
              {...field}
              label="Name"
              fullWidth
              margin="dense"
              error={Boolean(errors.name)}
            />
          )}
          rules={{ required: { value: true, message: "Name is Required" } }}
        />
        {errors.name && (
          <Typography color="red" variant="caption">
            {errors.name.message}
          </Typography>
        )}
        <Controller
          name="info"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="filled"
              {...field}
              label="Message"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              error={Boolean(errors.info)}
            />
          )}
          rules={{ required: { value: true, message: "Message is Required" } }}
        />
        {errors.name && (
          <Typography color="red" variant="caption">
            {errors.info?.message}
          </Typography>
        )}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{ mt: "1%", mx: "auto" }}
          >
            Inform
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default ContactForm;
