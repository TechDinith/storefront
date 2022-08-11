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
import Checkout from "../../pages/checkout/checkout.page";
import { iOpenDialog } from "../dialog/dialog.interface";
import ResetPasswordPage from "../../pages/resetpassword/resetPassword.page";
import { iLayout } from "./layout.interface";
const categories = ["men", "women", "accessories"];

const Layout = ({ products, dialogProps }: iLayout) => {
  const [count, setCount] = useState([]);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [message, setMessage] = useState<iMessage>({
    message: "",
    severity: "info",
  });

  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    setCount(
      localCart
        ? JSON.parse(typeof localCart === "string" ? localCart : "")
        : null
    );

    //replace with async
    // setAuth([{ name: "fred morgen", email: "sdsd@sdsd.com", remember: true }]);
  }, []);

  const handleNotificationClick = ({ message, severity }: iMessage) => {
    setMessage({ message, severity });
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  return (
    <>
      <Header products={products} />
      <Box component="main">
        <Grid container justifyContent="center">
          {/* admin=> 
          addadmin
          only pedros admins can delete products add admins or remove them 
          others can edite add products/ addproduct => new category   */}

          <Navbar
            categories={categories}
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
                path="/reset"
                element={
                  <ResetPasswordPage
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
                    authProps={{ auth, setAuth }}
                    dialogProps={dialogProps}
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
