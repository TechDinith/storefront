import Slider from "../../templates/slider/slider";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import sImage1 from "../../../images/simage1.jpg";
import sImage2 from "../../../images/simage2.jpg";
import sImage4 from "../../../images/simage4.jpg";
import sImg1 from "../../../images/square1.jpg";
import mode1 from "../../../images/mod1.jpg";
import mode2 from "../../../images/mode2.jpg";
import mode3 from "../../../images/mode3.jpg";
import wm from "../../../images/wm.jpg";
import wm1 from "../../../images/wm1.jpg";
import mode4 from "../../../images/mode4.jpg";
import MainSlogan from "../../sections/mainSlogan/mainSlogan.section";
import Catogories from "../../sections/catogories/catogories.section";
import SubSlogan from "../../sections/subSlogan/subSlogan.section";
import Latest from "../../sections/latest/latest.section";
import { iHome } from "./home.interfaces";

const sliderItems = {
  items: [
    {
      image: <Image src={sImage1} alt={sImage1} preview={false} />,
      category: "men",
    },
    {
      image: <Image src={sImage2} alt={sImage2} preview={false} />,
      category: "accessories",
    },
    {
      image: <Image src={sImage4} alt={sImage4} preview={false} />,
      category: "women",
    },
  ],
  isButton: true,
  btnText: "Check it Out",
  slidesToShow: 1,
  draggable: true,
  speed: 2000,
  isArrows: true,
};

const sliderItems1 = {
  items: [
    <Image src={wm} alt={wm} preview={false} width="100%" />,
    <Image src={sImg1} alt={sImage1} preview={false} width="100%" />,
    <Image src={wm1} alt={wm1} preview={false} width="100%" />,
  ],
  slidesToShow: 1,
  draggable: true,
  speed: 2000,
  isArrows: false,
  effect: "fade",
};

const sliderItems2 = {
  items: [
    <Image src={mode1} alt={mode1} preview={false} />,
    <Image src={mode2} alt={mode2} preview={false} />,
    <Image src={mode3} alt={mode3} preview={false} />,
    <Image src={mode4} alt={mode4} preview={false} />,
  ],
  slidesToShow: 3,
  draggable: true,
  speed: 1000,
  isArrows: true,
};

const Home = ({ setNotify, products }: iHome) => {
  return (
    <>
      <Grid item xs={10} m="1%">
        <Slider {...sliderItems} />
      </Grid>

      <Grid item xs={10} sm={5} justifyContent={"center"}>
        <MainSlogan />
      </Grid>
      <Grid item sm={5} sx={{ display: { xs: "none", sm: "block" } }}>
        <Slider {...sliderItems1} />
      </Grid>

      <Catogories />

      <Grid item xs={10} mt="5%">
        <SubSlogan path={"/women"} />
        <Slider {...sliderItems2} />
      </Grid>

      <Grid item xs={10} mt="5%">
        <Latest latestProducts={products} setNotify={setNotify} />
      </Grid>
    </>
  );
};

export default Home;
