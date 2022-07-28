import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from "antd";
import swideimg from "../../../images/swideimg.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";

const FollowUs = () => {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url( ${swideimg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        mt="2%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box py="1%">
          <Box
            color="white"
            my="8%"
            py="1%"
            sx={{ background: "rgb(0,0,0,0.50)", width: "100%" }}
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
        </Box>
      </Grid>
    </>
  );
};

export default FollowUs;
