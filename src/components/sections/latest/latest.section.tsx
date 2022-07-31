import Grid from "@mui/material/Grid";
import ProDetails from "../../templates/product-details/product.details";
import SubSlogan from "../subSlogan/subSlogan.section";
import { useState, useEffect } from "react";
import { iLatest, iLatestProps } from "./latest.interface";

const Latest = ({ notifyProps, latestProducts }: iLatestProps) => {
  const [latest, setLatest] = useState<iLatest[]>([]);
  useEffect(() => {
    if (latestProducts) setLatest(latestProducts);
  }, [latestProducts]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        mt="5%"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid item xs={12}>
          <SubSlogan path="/accssories" />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {latest.map((item, i) => (
          <Grid item xs={4} key={i}>
            <ProDetails
              notifyProps={notifyProps}
              preview={false}
              cart={item}
              latest={true}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Latest;
