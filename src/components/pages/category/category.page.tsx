import Grid from "@mui/material/Grid";
import men from "../../../images/simage1.jpg";
import women from "../../../images/simage4.jpg";
import accwide from "../../../images/accwide.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5black from "../../../images/prod5-black.jpg";
import prod5red from "../../../images/prod5-red.jpg";
import prod5white from "../../../images/prod5-white.jpg";
import prod6 from "../../../images/prod6.jpg";
import ProDetails from "../../templates/product-details/product.details";
import { iCategory, iCount } from "../../interface.page";
import { useEffect, useState } from "react";

const Category = ({ setCount, count }: iCount) => {
  const [categories, setCategories] = useState<iCategory[]>([]);
  const location = useLocation();
  const category = location.pathname.substring(1);

  useEffect(() => {
    setCategories([
      {
        id: "1",
        image: prod1,
        isColor: false,
        name: "Sample Item",
        price: "Rs.1500",
        category: "men",
      },
      {
        id: "2",
        image: prod2,
        isColor: false,
        name: "Sample Item",
        price: "Rs.1500",
        category: "men",
      },
      {
        id: "3",
        image: prod3,
        isColor: false,
        name: "Sample Item",
        price: "Rs.1500",
        category: "women",
      },
      {
        id: "4",
        image: prod4,
        isColor: false,
        name: "Sample Item",
        price: "Rs.1500",
        category: "women",
      },
      {
        id: "5",
        image: null,
        isColor: true,
        name: "Sample Item",
        price: "Rs.1500",
        colors: [
          { image: prod5black, color: "black" },
          { image: prod5red, color: "red" },
          { image: prod5white, color: "white" },
        ],
        category: "accessories",
      },
      {
        id: "6",
        image: prod6,
        category: "accessories",
        isColor: false,
        name: "Sample Item",
        price: "Rs.1500",
      },
    ]);
  }, []);

  return (
    <>
      <Grid
        item
        xs={10}
        sx={{
          backgroundImage: `url( ${
            category === "men"
              ? men
              : category === "women"
              ? women
              : category === "accessories"
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
            {categories.map((item, i) =>
              item.category === category ? (
                <Grid item xs={4} key={i}>
                  <ProDetails
                    countProps={{ setCount, count }}
                    preview={true}
                    cart={item}
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
            {categories.map((item, i) =>
              item.category === category ? (
                <Grid item xs={10} key={i}>
                  <ProDetails
                    countProps={{ setCount, count }}
                    preview={true}
                    cart={item}
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
