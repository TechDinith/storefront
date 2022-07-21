import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from "antd";
import swideimg from "../../../images/swideimg.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const FollowUs = () => {
  return (
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
  );
};

export default FollowUs;
