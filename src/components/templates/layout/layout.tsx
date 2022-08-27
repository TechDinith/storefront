import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../navbar/navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Checkout from "../../pages/checkout/checkout.page";
import ResetPasswordPage from "../../pages/resetpassword/resetPassword.page";
import { iLayout } from "./layout.interface";
import { iProducts } from "../product-details/interface.productdetails";
import { getProducts } from "../../../auth/firebase/firebase.products.functions";
import NotifyUse from "../notify/notify.template.use";
import { iMessage } from "../notify/notify.interfaces";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../../auth/firebase/firebase.config";
import {
  deleteCartItemsByUid,
  getCart,
} from "../../../auth/firebase/firebase.cart.functions";
import { status } from "../../../auth/auth.interface";
import {
  deleteCurrentUser,
  getUserByUid,
} from "../../../auth/firebase/firebase.users.functions";
import { getAdminsByUid } from "../../../auth/firebase/firebase.admin.functions";
import { Typography } from "antd";
import Terms from "../../pages/terms/terms.page";

const categories = ["men", "women", "accessories"];

const Layout = ({ dialogProps }: iLayout) => {
  const [count, setCount] = useState([]);
  const [products, setProducts] = useState<iProducts[] | [] | any>([]);
  const [authUser, setAuthUser] = useState<User>();
  const [notify, setNotify] = useState<iMessage>();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserByUid(user.uid).then((currentUser) => {
          if (!currentUser) {
            getAdminsByUid(user.uid).then((currentAdmin) => {
              if (currentAdmin) {
                signOut(auth)
                  .then(() => {
                    // console.log("out");
                  })
                  .catch((error) => {
                    // console.log("out err", error);
                  });
              } else {
                deleteCartItemsByUid(user.uid).then(() => {
                  deleteCurrentUser();
                  setNotify({
                    message: "Your Account is Banned!",
                    severity: "error",
                  });
                });
              }
            });
          } else {
            getCart().then((res) => {
              if (res.status === status.success) {
                let cart: any[] = [];
                res.data.docs.map((item: any) => {
                  if (item.data().authId === user.uid) {
                    cart.push(item.data());
                  }
                  return false;
                });

                localStorage.removeItem("cart");
                localStorage.setItem("cart", JSON.stringify(cart));

                setAuthUser(user);
              }
            });
          }
        });
      }
    });
  }, [navigate]);

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

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    setCount(
      localCart
        ? JSON.parse(typeof localCart === "string" ? localCart : "")
        : null
    );
  }, [authUser]);

  return (
    <>
      <Header products={products} />
      <Box component="main">
        <Grid container justifyContent="center">
          <Navbar
            categories={categories}
            authProps={{ authUser, setAuthUser }}
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
              <Route path="/terms" element={<Terms />} />

              <Route
                path="/contact"
                element={<Contact setNotify={setNotify} />}
              />
              <Route
                path="/checkout"
                element={
                  <Checkout
                    setNotify={setNotify}
                    authProps={{ authUser, setAuthUser }}
                    countProps={{ setCount, count }}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <SignInSide
                    setNotify={setNotify}
                    authProps={{ authUser, setAuthUser }}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignUpSide
                    authProps={{ authUser, setAuthUser }}
                    setNotify={setNotify}
                  />
                }
              />
              <Route
                path="/reset"
                element={
                  <ResetPasswordPage
                    authProps={{ authUser, setAuthUser }}
                    setNotify={setNotify}
                  />
                }
              />

              <Route
                path="/cart"
                element={
                  <Cart
                    authProps={{ authUser, setAuthUser }}
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
