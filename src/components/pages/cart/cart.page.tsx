import Grid from "@mui/material/Grid";
import wideabout from "../../../images/wideabout.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5black from "../../../images/prod5-black.jpg";
import prod5red from "../../../images/prod5-red.jpg";
import prod5white from "../../../images/prod5-white.jpg";
import prod6 from "../../../images/prod6.jpg";
import ProDetails from "../../templates/product-details/product.details";

const Cart = () => {
  const prodImages = [
    {
      image: prod1,
      isColor: false,
      name: "Sample Item",
      price: "Rs.1500",
      category: "men",
      orderedOn: null,
      addedOn: "07/11/2022",
    },
    {
      image: prod2,
      isColor: false,
      name: "Sample Item",
      price: "Rs.1500",
      category: "men",
      orderedOn: "07/11/2022",
      addedOn: "07/11/2022",
    },
    {
      image: prod3,
      isColor: false,
      name: "Sample Item",
      price: "Rs.1500",
      category: "women",
      orderedOn: "07/07/2022",
      addedOn: "07/07/2022",
    },
    {
      image: prod4,
      isColor: false,
      name: "Sample Item",
      price: "Rs.1500",
      category: "women",
      orderedOn: null,
      addedOn: "06/07/2022",
    },
    {
      image: null,
      isColor: true,
      name: "Sample Item",
      price: "Rs.1500",
      colors: [{ image: prod5black, color: "black" }],
      category: "accessories",
      orderedOn: "07/06/2022",
      addedOn: "07/06/2022",
    },
    {
      image: prod6,
      category: "accessories",
      isColor: false,
      name: "Sample Item",
      price: "Rs.1500",
      addedOn: "05/12/2022",
      orderedOn: "05/12/2022",
    },
  ];

  return (
    <>
      <Grid
        item
        xs={10}
        sx={{ backgroundImage: `url( ${wideabout})`, backgroundSize: "100%" }}
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
          <b>CART</b>
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
            {prodImages
              .sort((a, b) => +new Date(b.addedOn) - +new Date(a.addedOn))
              .map((item, i) => (
                <Grid item xs={4} key={i}>
                  {item.addedOn && (
                    <>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="orange"
                      >
                        Added On:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(new Date(item.addedOn))}
                      </Typography>

                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="cyan"
                      >
                        {item.orderedOn
                          ? "Checkedout On: " +
                            new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            }).format(new Date(item.addedOn))
                          : "Not yet checked out"}
                      </Typography>
                    </>
                  )}
                  <ProDetails
                    orderedOn={item.orderedOn}
                    addedOn={item.addedOn}
                    isCart={true}
                    name={item.name}
                    price={item.price}
                    preview={true}
                    isColor={item.isColor}
                    colors={item.colors}
                    item={item.image}
                  />
                </Grid>
              ))}
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            {prodImages
              .sort((a, b) => +new Date(b.addedOn) - +new Date(a.addedOn))
              .map((item, i) => (
                <Grid item xs={10} key={i}>
                  {item.addedOn && (
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="orange"
                    >
                      Added On:{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(item.addedOn))}
                    </Typography>
                  )}
                  <ProDetails
                    orderedOn={item.orderedOn}
                    addedOn={item.addedOn}
                    isCart={true}
                    name={item.name}
                    price={item.price}
                    preview={true}
                    isColor={item.isColor}
                    colors={item.colors}
                    item={item.image}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
