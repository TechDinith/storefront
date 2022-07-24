import Grid from "@mui/material/Grid";
import men from "../../../images/simage1.jpg";
import women from "../../../images/simage4.jpg";
import accwide from "../../../images/accwide.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Image } from "antd";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5 from "../../../images/prod5.jpg";
import prod6 from "../../../images/prod6.jpg";
import ProDetails from "../../templates/product-details/product.details";

const Category = () => {
  const location = useLocation();
  const category = location.pathname.substring(1);

  const prodImages = [
    {
      image: <Image src={prod1} alt={prod1} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "men",
    },
    {
      image: <Image src={prod2} alt={prod2} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "men",
    },
    {
      image: <Image src={prod3} alt={prod3} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "women",
    },
    {
      image: <Image src={prod4} alt={prod4} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "women",
    },
    {
      image: <Image src={prod5} alt={prod5} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "accessories",
    },
    {
      image: <Image src={prod6} alt={prod6} preview={false} />,
      colors: ["red", "green", "blue"],
      category: "accessories",
    },
  ];

  return (
    <>
      <Grid
        item
        xs={10}
        sx={{
          backgroundImage: `url( ${
            category == "men"
              ? men
              : category == "women"
              ? women
              : category == "accessories"
              ? accwide
              : null
          })`,
          backgroundSize: "cover",
        }}
        mt="2%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <Typography
            variant="h5"
            color="white"
            my="10%"
            mx="auto"
            fontStyle="oblique"
            sx={{ background: "rgb(0,0,0,0.80)", width: "fit-content" }}
          >
            " Possimus dignissimos voluptates nulla explicabo at dolore. "
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={10} mt="5%" mb="1%">
        <Typography variant="h4" textAlign="center" color="white">
          <b>{category.toLocaleUpperCase()}</b>
        </Typography>
      </Grid>

      <Grid container spacing={2} m="auto" justifyContent="center">
        <Grid item xs={10} mt="1%" mb="1%">
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
          >
            {prodImages.map((item, i) =>
              item.category === category ? (
                <Grid item xs={4} key={i}>
                  <ProDetails
                    isColor={true}
                    colors={item.colors}
                    item={item.image}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            {prodImages.map((item, i) =>
              item.category === category ? (
                <Grid item xs={10} key={i}>
                  <ProDetails
                    isColor={true}
                    colors={item.colors}
                    item={item.image}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Category;
