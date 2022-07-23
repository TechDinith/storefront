import Grid from "@mui/material/Grid";
import ProDetails from "../../templates/product-details/product.details";
import { Image } from "antd";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5 from "../../../images/prod5.jpg";
import prod6 from "../../../images/prod6.jpg";
import SubSlogan from "../subSlogan/subSlogan.section";

const Latest = () => {
  const prodImages = [
    {
      image: <Image src={prod1} alt={prod1} preview={false} />,
      colors: ["red", "green", "blue"],
    },
    {
      image: <Image src={prod2} alt={prod2} preview={false} />,
      colors: ["red", "green", "blue"],
    },
    {
      image: <Image src={prod3} alt={prod3} preview={false} />,
      colors: ["red", "green", "blue"],
    },
    {
      image: <Image src={prod4} alt={prod4} preview={false} />,
      colors: ["red", "green", "blue"],
    },
    {
      image: <Image src={prod5} alt={prod5} preview={false} />,
      colors: ["red", "green", "blue"],
    },
    {
      image: <Image src={prod6} alt={prod6} preview={false} />,
      colors: ["red", "green", "blue"],
    },
  ];
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
          <SubSlogan />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {prodImages.map((item, i) => (
          <Grid item xs={4} key={i}>
            <ProDetails
              isColor={false}
              colors={item.colors}
              item={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Latest;
