import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface IFormInput {
  email: string;
  name: string;
  message: string;
}

const ContactForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
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
            />
          )}
        />
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
            />
          )}
        />
        <Controller
          name="message"
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
            />
          )}
        />
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
