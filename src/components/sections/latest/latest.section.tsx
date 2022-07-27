import Grid from "@mui/material/Grid";
import ProDetails from "../../templates/product-details/product.details";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5black from "../../../images/prod5-black.jpg";
import prod5red from "../../../images/prod5-red.jpg";
import prod5white from "../../../images/prod5-white.jpg";
import prod6 from "../../../images/prod6.jpg";
import SubSlogan from "../subSlogan/subSlogan.section";
import { useState, useEffect } from "react";
import { iLatest } from "../../interface.page";

const Latest = () => {
  const [latest, setLatest] = useState<iLatest[]>([]);

  useEffect(() => {
    setLatest([
      {
        id: "1",
        image: prod1,
        name: "Sample Item",
        price: "Rs.1500",
        category: "men",
        isColor: false,
      },
      {
        id: "2",
        image: prod2,
        name: "Sample Item",
        price: "Rs.1500",
        category: "men",
        isColor: false,
      },
      {
        id: "3",
        image: prod3,
        name: "Sample Item",
        price: "Rs.1500",
        category: "women",
        isColor: false,
      },
      {
        id: "4",
        image: prod4,
        name: "Sample Item",
        price: "Rs.1500",
        category: "women",
        isColor: false,
      },
      {
        id: "5",
        image: null,
        name: "Sample Item",
        price: "Rs.1500",
        colors: [
          { image: prod5black, color: "black" },
          { image: prod5red, color: "red" },
          { image: prod5white, color: "white" },
        ],
        category: "accessories",
        isColor: false,
      },
      {
        id: "6",
        image: prod6,
        category: "accessories",
        name: "Sample Item",
        price: "Rs.1500",
        isColor: false,
      },
    ]);
  }, []);

  // const prodImages = [
  //   {
  //     image: prod1,
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //     category: "men",
  //   },
  //   {
  //     image: prod2,
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //     category: "men",
  //   },
  //   {
  //     image: prod3,
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //     category: "women",
  //   },
  //   {
  //     image: prod4,
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //     category: "women",
  //   },
  //   {
  //     image: null,
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //     colors: [
  //       { image: prod5black, color: "black" },
  //       { image: prod5red, color: "red" },
  //       { image: prod5white, color: "white" },
  //     ],
  //     category: "accessories",
  //   },
  //   {
  //     image: prod6,
  //     category: "accessories",
  //     name: "Sample Item",
  //     price: "Rs.1500",
  //   },
  // ];
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
        {latest.map((item, i) => (
          <Grid item xs={4} key={i}>
            <ProDetails preview={false} cart={item} latest={true} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Latest;
