import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Image } from "antd";
import { NavLink } from "react-router-dom";

const ProDetails = (items: {
  setCount?: any;
  item: any;
  isColor: boolean | false | undefined;
  colors?: { [x: string]: any } | undefined;
  name: string | undefined;
  price: string | undefined;
  preview: boolean | false;
  category?: string;
}) => {
  const [prodImage, setProdImage] = useState(
    items.item ? items.item : items.colors ? items.colors[0].image : null
  );
  return (
    <Box justifyContent="center" textAlign={"center"} color="white">
      <Image src={prodImage} alt={prodImage} preview={items.preview} />
      <Typography variant="h6" color="inherit" textTransform="uppercase">
        {items.name && items.name}
      </Typography>
      <Typography variant="body1" color="cyan" textTransform="uppercase">
        {items.price && items.price}
      </Typography>

      {items.isColor ? (
        <Box display="flex" justifyContent={"center"}>
          {items.colors &&
            items.colors.map((item: any, i: number) => (
              <IconButton key={i} onClick={() => setProdImage(item.image)}>
                <CircleIcon sx={{ color: item.color }} />
              </IconButton>
            ))}
        </Box>
      ) : items.category ? null : (
        <Box display="flex" justifyContent={"center"}>
          <IconButton disabled>
            <CircleIcon sx={{ color: "transparent" }} />
          </IconButton>
        </Box>
      )}

      {items.category ? (
        <Button
          sx={{
            "&:hover": {
              color: "white",
            },
          }}
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          component={NavLink}
          to={"/" + items.category}
        >
          <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={() => items.setCount(Math.floor(Math.random() * 9))}
        >
          <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      )}
    </Box>
  );
};

export default ProDetails;
