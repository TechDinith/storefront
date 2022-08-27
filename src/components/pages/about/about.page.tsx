import Grid from "@mui/material/Grid";
import { Image } from "antd";
import wideabout from "../../../images/wideabout.jpg";
import pedros2 from "../../../images/pedros2.png";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Quote from "../../templates/quote/quote.section";

const About = () => {
  return (
    <>
      <Quote
        bgImage={wideabout}
        quote={<p>" Elegance is not standing out, but being remembered. "</p>}
      />

      <Grid item xs={10} mt="5%" mb="1%">
        <Typography variant="h4" textAlign="center" color="white">
          <b>Who We Are</b>
        </Typography>
      </Grid>

      <Grid container spacing={1} m="auto" justifyContent="center">
        <Grid
          item
          md={4}
          xs={5}
          mr="1%"
          mb="1%"
          sx={{
            display: { xs: "none", sm: "flex", md: "true" },
          }}
        >
          <Image
            src={pedros2}
            alt="pedros logo"
            preview={false}
            style={{ background: "white" }}
          />
        </Grid>
        <Grid item xs={10} sm={10} md={5} component={Paper} elevation={2}>
          <Typography variant="body1" m="1%">
            <b>Lorem</b> ipsum, dolor sit amet consectetur adipisicing elit.
            Magnam nostrum animi laboriosam expedita dicta a, quod modi
            accusamus odit, eaque id fugit eligendi. Laborum, voluptas est?
            Asperiores porro accusantium ex! dolor sit amet consectetur
            adipisicing elit. Magnam nostrum animi laboriosam expedita dicta a,
            quod modi accusamus odit, eaque id fugit eligendi. Laborum, voluptas
            est? Asperiores porro accusantium ex!
          </Typography>
          <Typography variant="body1" m="1%">
            <b>Lorem</b> ipsum, dolor sit amet consectetur adipisicing elit.
            Magnam nostrum animi laboriosam expedita dicta a, quod modi
            accusamus odit, eaque id fugit eligendi. Laborum, voluptas est?
            Asperiores porro accusantium ex! dolor sit amet consectetur
            adipisicing elit. Magnam nostrum animi laboriosam expedita dicta a,
            quod modi accusamus odit, eaque id fugit eligendi. Laborum, voluptas
            est? Asperiores porro accusantium ex!
          </Typography>
          <Typography variant="body1" m="1%">
            <b>Lorem</b> ipsum, dolor sit amet consectetur adipisicing elit.
            Magnam nostrum animi laboriosam expedita dicta a, quod modi
            accusamus odit, eaque id fugit eligendi. Laborum, voluptas est?
            Asperiores porro accusantium ex! dolor sit amet consectetur
            adipisicing elit. Magnam nostrum animi laboriosam expedita dicta a,
            quod modi accusamus odit, eaque id fugit eligendi. Laborum, voluptas
            est? Asperiores porro accusantium ex!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
