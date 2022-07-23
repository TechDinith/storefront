import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ProDetails = (items: {
  item: any;
  isColor: boolean | false;
  colors: {
    [x: string]: any;
  };
}) => {
  return (
    <Box justifyContent="center" textAlign={"center"} color="white">
      {items.item}
      <Typography variant="h6" color="inherit" textTransform="uppercase">
        Sample Item
      </Typography>
      <Typography variant="body1" color="cyan" textTransform="uppercase">
        RS.1500
      </Typography>

      {items.isColor && (
        <Box display="flex" justifyContent={"center"}>
          {items.colors &&
            items.colors.map((item: string, i: number) => (
              <IconButton key={i}>
                <CircleIcon sx={{ color: item }} />
              </IconButton>
            ))}
        </Box>
      )}

      <Button variant="outlined" color="inherit" size="large" fullWidth>
        <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
      </Button>
    </Box>
  );
};

export default ProDetails;
