import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Image } from "antd";
import sImg1 from "../slider/images/square1.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ProDetails = ({ item }: any) => {
  return (
    <Box justifyContent="center" textAlign={"center"} color="white">
      <Image src={sImg1} alt="2" preview={false} />
      <Typography variant="h6" color="inherit" textTransform="uppercase">
        Sample Item
      </Typography>
      <Typography variant="body1" color="cyan" textTransform="uppercase">
        RS.1500
      </Typography>
      <Box display="flex" justifyContent={"center"}>
        <IconButton>
          <CircleIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton>
          <CircleIcon sx={{ color: "blue" }} />
        </IconButton>
        <IconButton>
          <CircleIcon sx={{ color: "green" }} />
        </IconButton>
      </Box>
      <Button variant="outlined" color="inherit" size="large" fullWidth>
        <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
      </Button>
    </Box>
  );
};

export default ProDetails;
