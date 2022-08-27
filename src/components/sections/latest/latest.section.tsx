import Grid from "@mui/material/Grid";
import ProDetails from "../../templates/product-details/product.details";
import SubSlogan from "../subSlogan/subSlogan.section";
import { useState, useEffect } from "react";
import { iLatest, iLatestProps } from "./latest.interface";

const Latest = ({ setNotify, latestProducts }: iLatestProps) => {
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
          <SubSlogan
            slogan={
              <p>
                Access the world. <b>With a touch</b>
              </p>
            }
            path="/accssories"
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {latest
          .sort(
            (a, b) =>
              +new Date(b.enteredOn as string) -
              +new Date(a.enteredOn as string)
          )
          .map(
            (item, i) =>
              i < 6 && (
                <Grid item xs={4} key={i}>
                  <ProDetails
                    setNotify={setNotify}
                    preview={false}
                    cart={item}
                    latest={true}
                  />
                </Grid>
              )
          )}
      </Grid>
    </>
  );
};

export default Latest;
