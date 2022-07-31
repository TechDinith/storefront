import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Header from "../header/header";
import Home from "../../pages/home/home.page";
import Footer from "../footer/footer.template";
import About from "../../pages/about/about.page";
import Contact from "../../pages/contact/contact.page";
import SignInSide from "../../pages/signin/signin.page";
import SignUpSide from "../../pages/signup/signup.page";
import Category from "../../pages/category/category.page";
import { useEffect, useState } from "react";
import Cart from "../../pages/cart/cart.page";
import NotFound from "../../pages/notfound/notfound.page";
import { iMessage, SnackbarMessage } from "../notify/notify.interfaces";
import { iProducts } from "../product-details/interface.productdetails";
import prod1 from "../../../images/prod1.jpg";
import prod2 from "../../../images/prod2.jpg";
import prod3 from "../../../images/prod3.jpg";
import prod4 from "../../../images/prod4.jpg";
import prod5black from "../../../images/prod5-black.jpg";
import prod5red from "../../../images/prod5-red.jpg";
import prod5white from "../../../images/prod5-white.jpg";
import prod6 from "../../../images/prod6.jpg";
import Checkout from "../../pages/checkout/checkout.page";

const categories = ["men", "women", "accessories"];

const Layout = () => {
  const [count, setCount] = useState([]);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [message, setMessage] = useState<iMessage>({
    message: "",
    severity: "info",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [auth, setAuth] = React.useState(null);
  const [products, setProducts] = useState<iProducts[] | []>([]);

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    setCount(
      localCart
        ? JSON.parse(typeof localCart === "string" ? localCart : "")
        : null
    );

    setProducts([
      {
        id: "1",
        image: prod1,
        isColor: false,
        name: "Sample Item 1",
        price: 1500.5,
        category: "men",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        enteredOn: "02/04/2022",
      },
      {
        id: "2",
        image: prod2,
        isColor: false,
        name: "Sample Item 2",
        price: 1400.5,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        category: "men",
        enteredOn: "02/05/2022",
      },
      {
        id: "3",
        image: prod3,
        isColor: false,
        name: "Sample Item 3",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: 1540.5,
        category: "women",
        enteredOn: "02/06/2022",
      },
      {
        id: "4",
        image: prod4,
        isColor: false,
        name: "Sample Item 4",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: 1504.5,
        category: "women",
        enteredOn: "02/07/2022",
      },
      {
        id: "5",
        image: null,
        isColor: true,
        name: "Sample Item 5",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: 150.5,
        colors: [
          { image: prod5black, color: "black" },
          { image: prod5red, color: "red" },
          { image: prod5white, color: "white" },
        ],
        category: "accessories",
        enteredOn: "02/08/2022",
      },
      {
        id: "6",
        image: prod6,
        category: "accessories",
        isColor: false,
        name: "Sample Item 6",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: 1500,
        enteredOn: "02/09/2022",
      },
    ]);
  }, []);

  const handleNotificationClick = ({ message, severity }: iMessage) => {
    setMessage({ message, severity });
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };
  //description products
  return (
    <>
      <Header products={products} />
      <Box component="main">
        <Grid container justifyContent="center">
          {/*checkout reset password if login cart should append and sent to database when removing it should go too and checkout details can be saved/ no products coming soon*/}
          {/* admin addadmin=>only pedros admins can delete/ addproduct => new category */}
          {/* validate form fields password phone numbers / add counter for the cart */}
          {/* checkout selected for cart/ delivery free or charge on categories */}
          <Navbar
            authProps={{ auth, setAuth }}
            countProps={{ setCount, count }}
            notifyProps={{
              handleNotificationClick,
              setSnackPack,
              snackPack,
              message,
            }}
            products={products}
          />
          <Grid container justifyContent="center">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  <Home
                    products={products}
                    notifyProps={{
                      message,
                      handleNotificationClick,
                      setSnackPack,
                      snackPack,
                    }}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/checkout"
                element={
                  <Checkout
                    notifyProps={{
                      message,
                      handleNotificationClick,
                      setSnackPack,
                      snackPack,
                    }}
                    authProps={{ auth, setAuth }}
                    countProps={{ setCount, count }}
                  />
                }
              />
              <Route
                path="/login"
                element={<SignInSide authProps={{ auth, setAuth }} />}
              />
              <Route
                path="/signup"
                element={
                  <SignUpSide
                    authProps={{ auth, setAuth }}
                    notifyProps={{
                      handleNotificationClick,
                      setSnackPack,
                      snackPack,
                      message,
                    }}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    dialogProps={{ openDialog, setOpenDialog }}
                    countProps={{ setCount, count }}
                    notifyProps={{
                      handleNotificationClick,
                      setSnackPack,
                      snackPack,
                      message,
                    }}
                  />
                }
              />
              {categories.map((path, i) => {
                return (
                  <Route
                    key={i}
                    path={"/" + path.toLowerCase()}
                    element={
                      <Category
                        products={products}
                        countProps={{ setCount, count }}
                        notifyProps={{
                          handleNotificationClick,
                          setSnackPack,
                          snackPack,
                          message,
                        }}
                      />
                    }
                  />
                );
              })}
            </Routes>
          </Grid>
          <Grid item xs={12} mt="5%" color="white">
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
