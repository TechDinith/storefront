import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <Box
      width="100%"
      sx={{
        py: "1%",
      }}
      textAlign="center"
    >
      <Typography
        variant="body2"
        color="inherit"
        textTransform="uppercase"
        component={Link}
        to="/terms"
      >
        Terms & Conditons
      </Typography>
    </Box>
  );
};

export default Docs;
