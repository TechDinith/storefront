import Grid from "@mui/material/Grid";
import wideabout from "../../../images/wideabout.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProDetails from "../../templates/product-details/product.details";
import { useEffect, useState } from "react";
import { iCart } from "../../templates/product-details/interface.productdetails";
import { useNavigate } from "react-router-dom";
import { iCartPage } from "./cart.interfaces";

const Cart = ({ countProps, notifyProps }: iCartPage) => {
  const [cart, setCart] = useState<iCart[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    if (localCart === null) {
      setTimeout(() => {
        setCart([]);
        navigate(-1);
      }, 1000);
    } else {
      setCart(
        localCart
          ? JSON.parse(typeof localCart === "string" ? localCart : "")
          : []
      );
    }
  }, [countProps.count]);

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
            {cart
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
                    notifyProps={notifyProps}
                    isCart={true}
                    preview={true}
                    cart={item}
                    countProps={countProps}
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
            {cart
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
                    notifyProps={notifyProps}
                    isCart={true}
                    preview={true}
                    cart={item}
                    countProps={countProps}
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
