import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import swideimg from "../../../images/swideimg.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

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
              <IconButton component={Link} to="#">
                <InstagramIcon sx={{ m: "1%" }} fontSize="large" />
              </IconButton>
              <IconButton component={Link} to="#">
                <FacebookIcon sx={{ m: "1%" }} fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default FollowUs;
