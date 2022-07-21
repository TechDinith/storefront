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

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main">
        <Grid container spacing={2} justifyContent="center">
          <Navbar />
          <Grid container spacing={2} justifyContent="center">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Grid>
        </Grid>

        <Grid item xs={12} mt="5%" color="white">
          <Footer />
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
