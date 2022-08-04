import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", sm: "70%", md: "40%" },
};

export default function ProductUpdateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //image any colors multiple or single
  //color picker or enter
  //any colors is a switch
  //category should be a select, new category =>create one

  const fields = [
    {
      name: "Name",
      id: "name",
      defaultValue: "",
    },
    {
      name: "Price",
      id: "price",
      defaultValue: "",
    },
    {
      name: "Description",
      id: "desc",
      defaultValue: "",
    },
  ];

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required!"),
    price: Yup.string().required("Price is Required!"),
    desc: Yup.string().required("Description is Required!"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    // navigate("/admin/dashboard", {
    //   state: { id: params.id, email: data.email },
    // });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container justifyContent="center" color="white">
            <Grid item xs={12} sm={8}>
              <Typography
                color="inherit"
                variant="h6"
                component="h2"
                textAlign="center"
              >
                New Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((fieldItems, i) => (
                  <React.Fragment key={i}>
                    <Controller
                      name={fieldItems.id}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          margin="normal"
                          fullWidth
                          label={fieldItems.name}
                          autoComplete={fieldItems.id}
                          autoFocus={i === 0}
                          variant="standard"
                          {...field}
                          error={Boolean(errors[fieldItems.id])}
                        />
                      )}
                    />

                    {errors[fieldItems.id] && (
                      <Typography color="red" variant="caption">
                        {errors[fieldItems.id]?.message as any}
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
                <Box>
                  <FormControlLabel
                    control={
                      <Controller
                        name="isColors"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Switch {...field} color="warning" />
                        )}
                      />
                    }
                    label="Any Colors"
                  />
                </Box>
                <Box width="100%" display="flex" justifyContent="right">
                  <IconButton type="submit" sx={{ mt: 3 }} color="success">
                    <EventAvailableIcon />
                  </IconButton>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
