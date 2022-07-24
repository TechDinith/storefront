import Grid from "@mui/material/Grid";
import wideabout from "../../../images/wideabout.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ContactForm from "../../sections/contact-form/contactForm.section";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";

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

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={10} mr="1%" mb="1%" px="2%">
          <ContactForm />
        </Grid>
        <Grid item xs={10} mr="1%" mb="1%" px="2%">
          <Box>
            <Box display="flex">
              <MailIcon color="info" />
              <Typography variant="body1" ml="2%" color="white">
                sample@sample.com
              </Typography>
            </Box>
            <Box display="flex">
              <CallIcon color="success" />
              <Typography variant="body1" ml="2%" color="white">
                +94323232
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
