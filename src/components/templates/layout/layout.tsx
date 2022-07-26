import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
import { useState } from "react";
import Cart from "../../pages/cart/cart.page";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const categories = ["men", "women", "accessories"];

const Layout = () => {
  const [count, setCount] = useState([]);
  return (
    <>
      <Header setCount={null} count={count} />
      <Box component="main">
        <Grid container justifyContent="center">
          <Navbar setCount={null} count={count} />
          <Grid container justifyContent="center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<SignInSide />} />
              <Route path="/signup" element={<SignUpSide />} />
              <Route path="/cart" element={<Cart />} />
              {categories.map((path) => {
                return (
                  <Route
                    path={"/" + path.toLowerCase()}
                    element={<Category setCount={setCount} count={count} />}
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
