import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { iAddressForm } from "./checkout.sections.interface";

export default function AddressForm({
  onSubmit,
  deliveryDetails,
  authProps,
}: iAddressForm) {
  const fields = [
    {
      name: "First name",
      id: "firstname",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.firstname) ||
        "",
    },
    {
      name: "Last name",
      id: "lastname",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.lastname) ||
        "",
    },
    {
      name: "Address",
      id: "address",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.address) ||
        "",
    },
    {
      name: "Phone",
      id: "phone",
      required: true,
      pattern:
        /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.phone) ||
        "",
    },
    {
      name: "Email",
      id: "email",
      type: "email",
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.email) ||
        "",
    },
    {
      name: "City",
      id: "city",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.city) ||
        "",
    },
    {
      name: "State/Province/Region",
      id: "area",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.area) ||
        "",
    },
    {
      name: "Zip / Postal code",
      id: "zip",
      required: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.zip) ||
        "",
    },
    {
      name: "Country",
      id: "country",
      disabled: true,
      defaultValue:
        // (authProps.auth && authProps.auth[0].order.deliveryDetails.country) ||
        "Sri Lanka",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom color="inherit">
        Delivery address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {fields.map((fieldDetails: any, i: number) => {
            return (
              <Fragment key={i}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={fieldDetails.id}
                    control={control}
                    defaultValue={
                      deliveryDetails[fieldDetails.id]
                        ? deliveryDetails[fieldDetails.id]
                        : fieldDetails.defaultValue
                        ? fieldDetails.defaultValue
                        : ""
                    }
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        type={fieldDetails.type ? fieldDetails.type : null}
                        multiline={fieldDetails.id === "address"}
                        rows={fieldDetails.id === "address" ? 3 : 0}
                        fullWidth
                        label={fieldDetails.name}
                        autoComplete={fieldDetails.id}
                        autoFocus={i === 0}
                        variant="standard"
                        {...field}
                        error={Boolean(errors[fieldDetails.id])}
                        disabled={
                          fieldDetails.disabled ? fieldDetails.disabled : false
                        }
                      />
                    )}
                    rules={{
                      pattern: {
                        value: fieldDetails.pattern
                          ? fieldDetails.pattern
                          : null,
                        message: fieldDetails.name + " not valid!",
                      },
                      maxLength: {
                        value: fieldDetails.pattern && 10,
                        message: "Max length is 10",
                      },
                      required: {
                        value: fieldDetails.required
                          ? fieldDetails.required
                          : false,
                        message: fieldDetails.name + " is Required",
                      },
                    }}
                  />
                  {errors[fieldDetails.id] && (
                    <Typography color="red" variant="caption">
                      {errors[fieldDetails.id]?.message as any}
                    </Typography>
                  )}
                </Grid>
              </Fragment>
            );
          })}
          {/* {authProps?.auth && (
            <Box ml="5%">
              <FormControlLabel
                control={
                  <Controller
                    name="saveAddress"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        defaultChecked={deliveryDetails["saveAddress"]}
                      />
                    )}
                  />
                }
                label="Save address details for the future purchases"
              />
            </Box>
          )} */}

          <Box width="100%" display="flex" justifyContent="right">
            <Button variant="contained" type="submit" sx={{ mt: 3 }}>
              NEXT
            </Button>
          </Box>
        </Grid>
      </form>
    </Fragment>
  );
}

//if loged in only save details
