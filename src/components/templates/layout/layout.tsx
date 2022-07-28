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

const categories = ["men", "women", "accessories"];

const Layout = () => {
  const [count, setCount] = useState([]);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [message, setMessage] = useState<iMessage>({
    message: "",
    severity: "info",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [auth, setAuth] = React.useState(false);

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    setCount(
      localCart
        ? JSON.parse(typeof localCart === "string" ? localCart : "")
        : null
    );
  }, []);

  const handleNotificationClick = ({ message, severity }: iMessage) => {
    setMessage({ message, severity });
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  return (
    <>
      <Header countProps={{ setCount, count }} />
      <Box component="main">
        <Grid container justifyContent="center">
          {/* profile search checkout if login cart should append and sent to database when removing it should go too*/}
          <Navbar
            authProps={{ auth, setAuth }}
            countProps={{ setCount, count }}
            notifyProps={{
              handleNotificationClick,
              setSnackPack,
              snackPack,
              message,
            }}
          />
          <Grid container justifyContent="center">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  <Home
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
                        key={i + 1}
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
