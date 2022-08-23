import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UseEmail from "../../../auth/Email/useEmail";
import { iContactForm, IFormInput } from "./contact.section.interface";
import { useState } from "react";
import { status } from "../../../auth/auth.interface";

const ContactForm = ({ setNotify }: iContactForm) => {
  const [disable, setDisable] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { sendEmail } = UseEmail(
    "https://public.herotofu.com/v1/81618350-230a-11ed-a969-f1ede4dc5ccf"
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setDisable(true);
    sendEmail({
      email: data.email,
      date: new Date().toISOString(),
      name: data.name,
      info: data.info,
    }).then((res) => {
      if (res.status === status.success) {
        setNotify({ message: "Done, email was sent!", severity: res.status });
      } else {
        setDisable(false);
        setNotify({
          message: "Error, reach us via phone or email!",
          severity: res.status,
        });
      }
    });
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
            disabled={disable}
          >
            Inform
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default ContactForm;
