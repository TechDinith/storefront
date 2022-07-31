import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];
// const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
// const payments = [
//   { name: "Card type", detail: "Visa" },
//   { name: "Card holder", detail: "Mr John Smith" },
//   { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
//   { name: "Expiry date", detail: "04/2024" },
// ];

//checkout price must be int and Rs must be added and total should change

export default function Review({ products, deliveryDetails }: any) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom color="inherit">
        <b>Order summary</b>
      </Typography>
      <List disablePadding>
        {products.map((product: any) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} color="inherit" />
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
              .map((items: any) => parseInt(items["price"].split(".")[1]))
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
