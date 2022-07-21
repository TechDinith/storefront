import Grid from "@mui/material/Grid";
import Docs from "../../sections/docs/docs.section";
import FollowUs from "../../sections/followus/followus.section";
import FooterBar from "../../sections/footerbar/footerBar.section";

const Footer = () => {
  return (
    <>
      <FollowUs />
      <Docs />
      <Grid
        container
        bgcolor="black"
        sx={{
          py: "1%",

          mb: "1%",
          p: "1%",
        }}
      >
        <FooterBar />
      </Grid>
    </>
  );
};

export default Footer;
