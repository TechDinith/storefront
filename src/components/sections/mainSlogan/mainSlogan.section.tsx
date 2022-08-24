import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const MainSlogan = () => {
  return (
    <Box
      py="20%"
      color={"white"}
      component="div"
      justifyContent={"center"}
      alignContent="center"
      display="flex"
      sx={{ flexDirection: "column" }}
    >
      <Typography variant="h2" color="inherit" textAlign={"center"}>
        Lorem ipsum dolor sit amet
      </Typography>
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        component={Link}
        to={"/men"}
        sx={{ marginLeft: "auto", marginRight: "auto" }}
      >
        Lorem ipsum
      </Button>
    </Box>
  );
};

export default MainSlogan;
