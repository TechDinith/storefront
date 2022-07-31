import Grid from "@mui/material/Grid";
import wideabout from "../../../images/wideabout.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContactForm from "../../sections/contact-form/contactForm.section";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import Quote from "../../templates/quote/quote.section";

const Contact = () => {
  return (
    <>
      <Quote bgImage={wideabout} />

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
