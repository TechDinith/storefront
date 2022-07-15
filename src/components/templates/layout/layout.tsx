import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../navbar/navbar";
import Slider from "../slider/slider";
import sImage1 from "../slider/images/simage1.jpg";
import sImage2 from "../slider/images/simage2.jpg";
import sImage4 from "../slider/images/simage4.jpg";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const sliderImages = [
  <img src={sImage1} alt="1" />,
  <img src={sImage2} alt="2" />,
  <img src={sImage4} alt="3" />,
];

const sliderItems = {
  items: sliderImages,
  isButton: true,
  btnText: "Check it Out",
};

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container spacing={2} justifyContent="center" m="auto">
          <Grid item xs={10}>
            <Navbar />
          </Grid>
          <Grid item xs={10} mt="4%">
            <Slider {...sliderItems} />
          </Grid>
          <Grid item xs={5}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={5}>
            <Item>xs=8</Item>
          </Grid>

          <Grid item xs={3}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={10}>
            <Item>xs=8</Item>
          </Grid>
          <Grid container justifyContent="center" spacing={2} m="auto">
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" m="auto">
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" m="auto" spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
