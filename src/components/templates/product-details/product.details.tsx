import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Image } from "antd";
import { NavLink } from "react-router-dom";
import Notify from "../notify/notify.template";
import { iCount } from "../../pages/interface.page";

const ProDetails = (items: {
  countProps?: iCount;
  orderedOn?: string | null;
  isCart?: boolean;
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddToCart = () => {
    items.countProps!.setCount([...items.countProps!.count, { test: "test" }]);
    handleClick();
  };

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
      ) : items.isCart ? (
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
          to={"/checkout"}
          disabled={items.orderedOn ? true : false}
        >
          {items.orderedOn !== null ? (
            "Order will receive within 15 days"
          ) : (
            <>
              <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={handleAddToCart}
        >
          <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      )}
      <Notify handleClose={handleClose} open={open} message={"Item Added"} />
    </Box>
  );
};

export default ProDetails;
