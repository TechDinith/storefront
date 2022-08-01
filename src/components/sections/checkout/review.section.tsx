import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { iReview } from "./checkout.sections.interface";

export default function Review({ products, deliveryDetails }: iReview) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom color="inherit">
        <b>Order summary</b>
      </Typography>
      <List disablePadding>
        {products.map((product: any) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={
                product.colors[0].color !== "transparent"
                  ? product.name + "-" + product.colors[0].color
                  : product.name
              }
              secondary={product.desc ? product.desc : ""}
              color="inherit"
            />
            <Typography variant="body2" color="inherit">
              {product.price}
            </Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" color="inherit" />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700 }}
            color="inherit"
          >
            {products
              .map((items: any) => parseFloat(items["price"]))
              .reduce((a: any, b: any) => a + b)}
          </Typography>
        </ListItem>
      </List>
      <Divider /> <Divider />
      <Divider /> <Divider />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} color="inherit">
          <Divider>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1 }}
              color="inherit"
            >
              Delivery
            </Typography>
          </Divider>
          <Typography gutterBottom>
            {deliveryDetails.firstname + " " + deliveryDetails.lastname}
          </Typography>
          <Typography gutterBottom>
            {deliveryDetails.address +
              ", " +
              deliveryDetails.zip +
              ", " +
              deliveryDetails.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6} color="inherit">
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }} color="inherit">
            <Divider>Payment details</Divider>
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom color="inherit">
                    {payment.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom color="inherit">
                    {payment.detail}
                  </Typography>
                </Grid>
              </Fragment>
            ))} */}
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  disabled
                  color="secondary"
                  name="cashon"
                  value="yes"
                />
              }
              label="Cash on Delivery"
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
