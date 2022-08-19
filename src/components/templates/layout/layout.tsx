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
import Checkout from "../../pages/checkout/checkout.page";
import ResetPasswordPage from "../../pages/resetpassword/resetPassword.page";
import { iLayout } from "./layout.interface";
import { iProducts } from "../product-details/interface.productdetails";
import { getProducts } from "../../../auth/firebase/firebase.products.functions";
import NotifyUse from "../notify/notify.template.use";
import { iMessage } from "../notify/notify.interfaces";
import { handleImageUrl } from "../../../auth/firebase/firebase.storage";

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

    //replace with async
    // setAuth([{ name: "fred morgen", email: "sdsd@sdsd.com", remember: true }]);
  }, []);

  useEffect(() => {
    getProducts().then((res) => {
      if (res.status === "success") {
        let rawRows: any[] = [];
        res.data.forEach((doc: any) =>
          rawRows.push({ ...doc.data(), id: doc.id })
        );

        rawRows.map((product: any) => {
          if (product.image === null) {
            product.colors.map((color: any) => {
              handleImageUrl(color.image).then((url) => {
                color["url"] = url;
              });
              return;
            });
          }

          if (product.image !== null) {
            handleImageUrl(product.image).then((url) => {
              product["image"] = { image: product.image, url: url };
            });
          }
          return;
        });

        setProducts(rawRows);
      }
    });

    //replace with async
    // const products = [
    //   {
    //     id: "1",
    //     image: "prod1.jpg",
    //     isColor: false,
    //     name: "Sample Item 1",
    //     price: "1500.5",
    //     category: "men",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     enteredOn: new Date(),
    //   },
    //   {
    //     id: "2",
    //     image: "prod2.jpg",
    //     isColor: false,
    //     name: "Sample Item 2",
    //     price: 1400.5,
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     category: "men",
    //     enteredOn: new Date(),
    //   },
    //   {
    //     id: "3",
    //     image: "prod3.jpg",
    //     isColor: false,
    //     name: "Sample Item 3",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     price: "1540.5",
    //     category: "women",
    //     enteredOn: new Date(),
    //   },
    //   {
    //     id: "4",
    //     image: "prod4.jpg",
    //     isColor: false,
    //     name: "Sample Item 4",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     price: "1504.5",
    //     category: "women",
    //     enteredOn: new Date(),
    //   },
    //   {
    //     id: "5",
    //     image: null,
    //     isColor: true,
    //     name: "Sample Item 5",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     price: "150.5",
    //     colors: [
    //       { id: "7", image: "prod5-black.jpg", color: "black" },
    //       { id: "8", image: "prod5-red.jpg", color: "red" },
    //       { id: "9", image: "prod5-white.jpg", color: "white" },
    //     ],
    //     category: "women",
    //     enteredOn: new Date(),
    //   },
    //   {
    //     id: "6",
    //     image: "prod6.jpg",
    //     category: "women",
    //     isColor: false,
    //     name: "Sample Item 6",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
    //     price: "1500",
    //     enteredOn: new Date(),
    //   },
    // ] as any;
  }, []);

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
