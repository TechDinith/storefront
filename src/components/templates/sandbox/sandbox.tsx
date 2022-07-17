import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import ProDetails from "../product-details/product.details";

const SandBox = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={3}>
            <ProDetails />
          </Grid>
          <Grid item xs={3}>
            <ProDetails />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <ProDetails />
        </Grid>
        <Grid item xs={4}>
          <ProDetails />
        </Grid>
        <Grid item xs={4}>
          <ProDetails />
        </Grid>
        <Grid item xs={4}>
          <ProDetails />
        </Grid>
        <Grid item xs={4}>
          <ProDetails />
        </Grid>
      </Grid>
    </>
  );
};

export default SandBox;
