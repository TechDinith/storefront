import Grid from "@mui/material/Grid";
import wideabout from "../../../images/wideabout.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProDetails from "../../templates/product-details/product.details";
import { useEffect, useState } from "react";
import { iCart } from "../../templates/product-details/interface.productdetails";
import { Link, useNavigate } from "react-router-dom";
import { iCartPage } from "./cart.interfaces";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Quote from "../../templates/quote/quote.section";

const Cart = ({ countProps, setNotify, dialogProps, authProps }: iCartPage) => {
  const [cart, setCart] = useState<iCart[]>([]);
  const [checkouts, setCheckouts] = useState<null | iCart[]>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let localCart = localStorage.getItem("cart");

    if (localCart === null) {
      setTimeout(() => {
        authProps?.setAuth(authProps.auth ? authProps.auth : null);
        setCart([]);
        setCheckouts(null);
        navigate(-1);
      }, 100);
    } else {
      setCart(
        localCart
          ? JSON.parse(typeof localCart === "string" ? localCart : "")
          : []
      );

      //should sent to the database too and replace the current cart of the user
      authProps?.setAuth(
        authProps.auth
          ? [
              {
                ...authProps?.auth[0],
                cart: localCart
                  ? JSON.parse(typeof localCart === "string" ? localCart : "")
                  : [],
              },
            ]
          : authProps.auth
      );
    }
  }, [
    countProps.count,
    dialogProps?.openDialog,
    navigate,
    authProps,
    setNotify,
  ]);

  //modifie selected items for alll the pages
  return (
    <>
      <Quote bgImage={wideabout} />

      <Grid item xs={10} mt="5%" mb="1%">
        <Typography variant="h4" textAlign="center" color="white" mb={1}>
          <b>CART</b>
        </Typography>
        <Box display="flex" justifyContent="right">
          {checkouts === null ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCheckouts([])}
            >
              Select Lorem
            </Button>
          ) : (
            <>
              {checkouts.length && (
                <Button
                  variant="outlined"
                  color="info"
                  component={Link}
                  to="/checkout"
                  state={{ checkouts: checkouts }}
                  sx={{ mr: 1 }}
                >
                  ipsum
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => setCheckouts(null)}
              >
                Cancel Lorem
              </Button>
            </>
          )}
        </Box>
      </Grid>
      <Grid container spacing={2} m="auto" justifyContent="center">
        <Grid item xs={10} mt="1%" mb="1%">
          <Grid container spacing={2} direction="row">
            {cart
              .sort((a, b) => +new Date(b.addedOn) - +new Date(a.addedOn))
              .map((item, i) => (
                <Grid item xs={10} sm={4} key={i}>
                  {checkouts !== null ? (
                    <Checkbox
                      onChange={(e) =>
                        e.target.checked === true
                          ? setCheckouts([...checkouts, item])
                          : setCheckouts(
                              checkouts.filter((items) => items.id !== item.id)
                            )
                      }
                      name="checkoutselect"
                    />
                  ) : null}
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
                    dialogProps={dialogProps}
                    setNotify={setNotify}
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
