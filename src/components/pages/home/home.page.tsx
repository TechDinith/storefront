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

const Home = () => {
  return (
    <>
      <Grid item xs={10} m="1%">
        <Slider {...sliderItems} />
      </Grid>

      <Grid item xs={5} justifyContent={"center"}>
        <MainSlogan />
      </Grid>
      <Grid item xs={5}>
        <Slider {...sliderItems1} />
      </Grid>

      <Catogories />

      <Grid item xs={10} mt="5%">
        <SubSlogan />
        <Slider {...sliderItems2} />
      </Grid>

      <Grid item xs={10} mt="5%">
        <Latest />
      </Grid>
    </>
  );
};

export default Home;
