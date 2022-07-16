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
import { Image } from "antd";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const sliderImages = [
  <Image src={sImage1} alt="1" preview={false} />,
  <Image src={sImage2} alt="2" preview={false} />,
  <Image src={sImage4} alt="3" preview={false} />,
];

const sliderItems = {
  items: sliderImages,
  isButton: true,
  btnText: "Check it Out",
};

const Layout = () => {
  return (
    <Box component="main">
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          width: "100%",
          p: "1%",
          mb: "1%",
          background: "black",
        }}
      >
        <Typography color={"white"} p="auto" m="auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>

        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          sx={{ color: "white", marginLeft: "50%" }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button>
          <ShoppingCartSharpIcon color="secondary" />
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Navbar />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10} m="1%">
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
