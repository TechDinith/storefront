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
import sImg1 from "../slider/images/square1.jpg";
import men from "../slider/images/men.jpg";
import women from "../slider/images/women.jpg";
import mode1 from "../slider/images/mod1.jpg";
import mode2 from "../slider/images/mode2.jpg";
import mode3 from "../slider/images/mode3.jpg";
import wm from "../slider/images/wm.jpg";
import wm1 from "../slider/images/wm1.jpg";
import mode4 from "../slider/images/mode4.jpg";
import prod1 from "../slider/images/prod1.jpg";
import prod2 from "../slider/images/prod2.jpg";
import prod3 from "../slider/images/prod3.jpg";
import prod4 from "../slider/images/prod4.jpg";
import prod5 from "../slider/images/prod5.jpg";
import prod6 from "../slider/images/prod6.jpg";
import acc from "../slider/images/acc.jpg";
import swideimg from "../slider/images/swideimg.jpg";
import { Image } from "antd";
import { Typography, Zoom } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ProDetails from "../product-details/product.details";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";

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
  slidesToShow: 1,
  draggable: true,
  speed: 2000,
  isArrows: true,
};
const sliderItems1 = {
  items: [
    <Image src={wm} alt="2" preview={false} width="100%" />,
    <Image src={sImg1} alt="2" preview={false} width="100%" />,
    <Image src={wm1} alt="2" preview={false} width="100%" />,
  ],
  slidesToShow: 1,
  draggable: true,
  speed: 2000,
  isArrows: false,
  effect: "fade",
};

const sliderItems2 = {
  items: [
    <Image src={mode1} alt="2" preview={false} />,
    <Image src={mode2} alt="2" preview={false} />,
    <Image src={mode3} alt="2" preview={false} />,
    <Image src={mode4} alt="2" preview={false} />,
  ],
  slidesToShow: 3,
  draggable: true,
  speed: 1000,
  isArrows: true,
};
const prodImages = {
  item: [
    <Image src={prod1} alt="2" preview={false} />,
    <Image src={prod2} alt="2" preview={false} />,
    <Image src={prod3} alt="2" preview={false} />,
    <Image src={prod4} alt="2" preview={false} />,
    <Image src={prod5} alt="2" preview={false} />,
    <Image src={prod6} alt="2" preview={false} />,
  ],
};

const Layout = () => {
  return (
    <>
      <Grid
        container
        bgcolor="black"
        sx={{
          py: "1%",
          display: { xs: "none", sm: "none", md: "flex" },
          mb: "1%",
          p: "1%",
        }}
      >
        <Grid item xs={6}>
          <Typography
            variant="body2"
            color="white"
            textTransform="uppercase"
            sx={{ mt: "1%" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
        </Grid>

        <Grid item xs={6} container direction="row" justifyContent="flex-end">
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            sx={{ color: "white" }}
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
        </Grid>
      </Grid>
      <Box component="main">
        <Grid container spacing={2} justifyContent="center">
          <Navbar />
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10} m="1%">
              <Slider {...sliderItems} />
            </Grid>
            <Grid item xs={5} justifyContent={"center"}>
              <Box
                py="20%"
                color={"white"}
                component="div"
                justifyContent={"center"}
                alignContent="center"
                display="flex"
                sx={{ flexDirection: "column" }}
              >
                <Typography variant="h2" color="inherit" textAlign={"center"}>
                  Lorem ipsum dolor sit amet
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Lorem ipsum
                </Button>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Slider {...sliderItems1} />
            </Grid>

            <Grid
              item
              xs={10}
              mt="5%"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Box className="image-group-vertical" mb="2%">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ position: "absolute", p: "37%" }}
                >
                  MEN
                </Typography>
                <Image src={men} alt="1" preview={false} />
              </Box>

              <Box className="image-group-vertical" mb="2%">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ position: "absolute", py: "40%", px: "30%" }}
                >
                  WOMEN
                </Typography>
                <Image src={women} alt="3" preview={false} />
              </Box>

              <Box className="image-group-vertical" mb="2%">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ position: "absolute", py: "40%", px: "25%" }}
                >
                  ACCESSORIES
                </Typography>
                <Image src={acc} alt="4" preview={false} />
              </Box>
            </Grid>

            <Grid
              item
              xs={10}
              mt="5%"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Box display={"flex"}>
                <Box className="image-group" width={"34%"}>
                  <Typography variant="h6" color="white">
                    MEN
                  </Typography>
                </Box>
                <Box className="image-group" width={"34%"}>
                  <Typography variant="h6" color="white">
                    WOMEN
                  </Typography>
                </Box>
                <Box className="image-group" width={"34%"}>
                  <Typography variant="h6" color="white">
                    ACCESSORIES
                  </Typography>
                </Box>
              </Box>

              <Image.PreviewGroup>
                <Box display={"flex"}>
                  <Box className="image-group" width={"34%"}>
                    <Image src={men} alt="1" preview={false} />
                  </Box>
                  <Box className="image-group" width={"34%"}>
                    <Image src={women} alt="3" preview={false} />
                  </Box>
                  <Box className="image-group" width={"34%"}>
                    <Image src={acc} alt="4" preview={false} />
                  </Box>
                </Box>
              </Image.PreviewGroup>
            </Grid>

            <Grid item xs={10} mt="5%">
              <Grid container spacing={2} mb="2%">
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ background: "gray" }}
                  >
                    Lorem Ipsum. <b>SIT Amet</b>
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  container
                  direction="row"
                  justifyContent="flex-end"
                >
                  <Typography
                    variant="h6"
                    color="white"
                    textAlign={"right"}
                    sx={{ textDecoration: "underline" }}
                  >
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Shop Now
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Slider {...sliderItems2} />
            </Grid>

            <Grid
              container
              justifyContent="center"
              spacing={2}
              mt="5%"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Grid item xs={10}>
                <Grid container spacing={2} mb="2%">
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      color="white"
                      sx={{ background: "gray" }}
                    >
                      Lorem Ipsum. <b>SIT Amet</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    container
                    direction="row"
                    justifyContent="flex-end"
                  >
                    <Typography
                      variant="h6"
                      color="white"
                      textAlign={"right"}
                      sx={{ textDecoration: "underline" }}
                    >
                      <Link
                        to="#"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Shop Now
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[0]} />
              </Grid>
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[1]} />
              </Grid>
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[2]} />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              spacing={2}
              m="auto"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[3]} />
              </Grid>
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[4]} />
              </Grid>
              <Grid item xs={3}>
                <ProDetails item={prodImages.item[5]} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt="5%" color="white">
          <Box textAlign="center">
            <Box
              width="100%"
              bgcolor="black"
              sx={{
                opacity: 0.75,
                zIndex: 1,
                position: "absolute",
                mt: "15%",
                py: "1%",
              }}
            >
              <Typography variant="h5" color="inherit">
                <b>Follow Us</b>
              </Typography>
              <Box
                display="flex"
                mx="auto"
                alignItems="center"
                sx={{ justifyContent: "center" }}
              >
                <InstagramIcon sx={{ m: "1%" }} fontSize="large" />
                <FacebookIcon sx={{ m: "1%" }} fontSize="large" />
              </Box>
            </Box>
            <Image src={swideimg} alt="1" preview={false} />
          </Box>
          <Box
            width="100%"
            sx={{
              py: "1%",
            }}
            textAlign="center"
          >
            <Typography
              variant="body2"
              color="inherit"
              textTransform="uppercase"
            >
              Terms & Conditons
            </Typography>
          </Box>
          <Grid
            container
            bgcolor="black"
            sx={{
              py: "1%",

              mb: "1%",
              p: "1%",
            }}
          >
            <Grid item xs={12} display="flex" justifyContent="center">
              <CopyrightIcon fontSize="small" sx={{ mr: "0.5%" }} />
              <Typography
                variant="subtitle2"
                color="inherit"
                textTransform="uppercase"
              >
                {new Date().getFullYear()} | Logo All Rights Reserved
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="flex-end"
            >
              <Typography variant="subtitle2" color="cyan">
                Developed by iTrans
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
