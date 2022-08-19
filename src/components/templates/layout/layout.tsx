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
import { useCallback, useEffect, useState } from "react";
import Cart from "../../pages/cart/cart.page";
import NotFound from "../../pages/notfound/notfound.page";
import Checkout from "../../pages/checkout/checkout.page";
import ResetPasswordPage from "../../pages/resetpassword/resetPassword.page";
import { iLayout } from "./layout.interface";
import { iProducts } from "../product-details/interface.productdetails";
import { getProducts } from "../../../auth/firebase/firebase.products.functions";
import NotifyUse from "../notify/notify.template.use";
import { iMessage } from "../notify/notify.interfaces";
import { handleImageUrl } from "../../../auth/firebase/firebase.storage";
import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../auth/firebase/firebase.config";

const categories = ["men", "women", "accessories"];

const Layout = ({ dialogProps }: iLayout) => {
  const [count, setCount] = useState([]);
  const [products, setProducts] = useState<iProducts[] | [] | any>([]);
  const [auth, setAuth] = useState<any>(null);
  const [notify, setNotify] = useState<iMessage>();

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    setCount(
      localCart
        ? JSON.parse(typeof localCart === "string" ? localCart : "")
        : null
    );
  }, []);

  useEffect(() => {
    getProducts().then((res) => {
      if (res.status === "success") {
        let rawRows: any[] = [];
        res.data.forEach((doc: any) =>
          rawRows.push({ ...doc.data(), id: doc.id })
        );

        setProducts(rawRows);
      }
    });
  }, []);

  //check admin logins at the admin panel

  return (
    <>
      <Header products={products} />
      <Box component="main">
        <Grid container justifyContent="center">
          <Navbar
            categories={categories}
            authProps={{ auth, setAuth }}
            countProps={{ setCount, count }}
            setNotify={setNotify}
            products={products}
          />
          <Grid container justifyContent="center">
            <Routes>
              <Route path="*" element={<NotFound />} />

              <Route
                path="/"
                element={<Home products={products} setNotify={setNotify} />}
              />

              <Route path="/about" element={<About />} />
              {/* send email */}
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/checkout"
                element={
                  <Checkout
                    setNotify={setNotify}
                    authProps={{ auth, setAuth }}
                    countProps={{ setCount, count }}
                  />
                }
              />
              <Route
                path="/login"
                element={<SignInSide authProps={{ auth, setAuth }} />}
              />
              {/* <Route
                path="/signup"
                element={
                  <SignUpSide
                    authProps={{ auth, setAuth }}
                    setNotify={setNotify}
                  />
                }
              />
              <Route
                path="/reset"
                element={
                  <ResetPasswordPage
                    authProps={{ auth, setAuth }}
                    setNotify={setNotify}
                  />
                }
              />
            */}
              <Route
                path="/cart"
                element={
                  <Cart
                    authProps={{ auth, setAuth }}
                    dialogProps={dialogProps}
                    countProps={{ setCount, count }}
                    setNotify={setNotify}
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
                        setNotify={setNotify}
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
      <NotifyUse messageProps={notify} />
    </>
  );
};

export default Layout;
