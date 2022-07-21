import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ProDetails from "../../templates/product-details/product.details";
import { Image } from "antd";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5 from "../../../images/prod5.jpg";
import prod6 from "../../../images/prod6.jpg";

const Latest = () => {
  const prodImages = {
    item: [
      <Image src={prod1} alt="2" preview={false} />,
      <Image src={prod2} alt="2" preview={false} />,
      <Image src={prod3} alt="2" preview={false} />,
      <Image src={prod4} alt="2" preview={false} />,
      <Image src={prod5} alt="2" preview={false} />,
      <Image src={prod6} alt="2" preview={false} />,
    ],
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        mt="5%"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid item xs={10}>
          <Grid container spacing={2} mb="2%">
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="white"
                sx={{ background: "gray" }}
              >
                Lorem Ipsum. <b>SIT Amet</b>
              </Typography>
            </Grid>

            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="flex-end"
            >
              <Typography
                variant="h6"
                color="white"
                textAlign={"right"}
                sx={{ textDecoration: "underline" }}
              >
                <Link to="#" style={{ textDecoration: "none", color: "white" }}>
                  Shop Now
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[0]} />
        </Grid>
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[1]} />
        </Grid>
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[2]} />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={2}
        m="auto"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[3]} />
        </Grid>
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[4]} />
        </Grid>
        <Grid item xs={3}>
          <ProDetails item={prodImages.item[5]} />
        </Grid>
      </Grid>
    </>
  );
};

export default Latest;
