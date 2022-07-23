import Grid from "@mui/material/Grid";
import { Image } from "antd";
import wideabout from "../../../images/wideabout.jpg";
import simg2 from "../../../images/simg2.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ContactForm from "../../sections/contact-form/contactForm.section";

const Contact = () => {
  return (
    <>
      <Grid
        item
        xs={10}
        sx={{ backgroundImage: `url( ${wideabout})`, backgroundSize: "100%" }}
        mt="2%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <Typography
            variant="h5"
            color="white"
            my="10%"
            mx="auto"
            fontStyle="oblique"
            sx={{ background: "rgb(0,0,0,0.80)", width: "fit-content" }}
          >
            " Possimus dignissimos voluptates nulla explicabo at dolore. "
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={10} mt="5%" mb="1%">
        <Typography variant="h4" textAlign="center" color="white">
          <b>Reach Us</b>
        </Typography>
      </Grid>

      <Grid container spacing={2} m="auto" justifyContent="center">
        <Grid item xs={5} mr="1%" mb="1%">
          <ContactForm />
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

export default Contact;
