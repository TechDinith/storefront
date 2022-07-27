import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { Image } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Notify from "../notify/notify.template";
import { iProdDetails } from "../../interface.page";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StartIcon from "@mui/icons-material/Start";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ProDetails = (items: iProdDetails) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState({
    image: items.cart.image
      ? items.cart.image
      : items.cart.colors
      ? items.cart.colors[0].image
      : null,
    color: items.cart.colors ? items.cart.colors[0] : "transparent",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ message: "", severity: "" });

  // useEffect(() => {
  //   //
  // }, [items.countProps?.count]);

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
    let cartItem = {
      id: items.cart.id,
      image: selectedProduct.image,
      category: items.cart.category,
      isColor: items.cart.isColor,
      name: items.cart.name,
      price: items.cart.price,
      addedOn: items.cart.addedOn,
      colors: [{ imgae: selectedProduct.image, color: selectedProduct.color }],
      orderedOn: items.cart.orderedOn,
    };
    let isMatch: any =
      items.countProps?.count !== null
        ? items.countProps?.count.map((item: any) => {
            if (item.id === cartItem.id) {
              return true;
            }
          })
        : false;
    console.log(items.cart.id, items.countProps?.count, isMatch);

    if (items.countProps?.count !== null && isMatch.includes(true)) {
      setMessage({ message: "Item Already Added!", severity: "info" });
      handleClick();
    } else {
      if (items.countProps?.count === null) {
        items.countProps!.setCount([cartItem]);
        localStorage.setItem("cart", JSON.stringify([cartItem]));
      } else {
        items.countProps!.setCount([...items.countProps!.count, cartItem]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...items.countProps!.count, cartItem])
        );
      }
      setMessage({ message: "Item Added!", severity: "success" });
      handleClick();
    }
  };

  const handleRemove = () => {
    let localCart = localStorage.getItem("cart");
    let jsonCart = JSON.parse(typeof localCart === "string" ? localCart : "");

    let cartItems = jsonCart.filter(
      (product: any) =>
        String(product.id).trim() !== String(items.cart.id).trim()
    );
    if (cartItems.length) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      items.countProps!.setCount(cartItems);
    } else {
      items.countProps!.setCount(null);
      localStorage.removeItem("cart");
      setMessage({ message: "Cart is Empty!", severity: "error" });
      handleClick();
      navigate(-1);
    }
  };

  return (
    <Box justifyContent="center" textAlign={"center"} color="white">
      {items.isCart ? (
        <Box>
          <IconButton onClick={handleRemove}>
            <RemoveCircleOutlineIcon fontSize="large" color="error" />
          </IconButton>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.color}
            preview={items.preview}
          />
        </Box>
      ) : (
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.color}
          preview={items.preview}
        />
      )}

      <Typography variant="h6" color="inherit" textTransform="uppercase">
        {items.cart.name && items.cart.name}
      </Typography>
      <Typography variant="body1" color="cyan" textTransform="uppercase">
        {items.cart.price && items.cart.price}
      </Typography>

      {items.cart.isColor ? (
        items.isCart ? (
          <Box display="flex" justifyContent={"center"}>
            {items.cart.colors &&
              items.cart.colors.map((item: any, i: number) => (
                <CircleIcon key={i} sx={{ color: item.color }} />
              ))}
          </Box>
        ) : (
          <Box display="flex" justifyContent={"center"}>
            {items.cart.colors &&
              items.cart.colors.map((item: any, i: number) => (
                <IconButton
                  key={i}
                  onClick={() =>
                    setSelectedProduct({ image: item.image, color: item.color })
                  }
                >
                  <CircleIcon sx={{ color: item.color }} />
                </IconButton>
              ))}
          </Box>
        )
      ) : items.latest ? null : (
        <Box display="flex" justifyContent={"center"}>
          <IconButton disabled>
            <CircleIcon sx={{ color: "transparent" }} />
          </IconButton>
        </Box>
      )}
      {items.isCart ? (
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
          disabled={items.cart.orderedOn !== null ? true : false}
        >
          {items.cart.orderedOn !== null ? (
            "Order will receive within 15 days"
          ) : (
            <>
              <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
            </>
          )}
        </Button>
      ) : items.latest ? (
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
          to={"/" + items.cart.category}
        >
          <StartIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      ) : items.cart.category ? (
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={handleAddToCart}
        >
          <ShoppingCartCheckoutIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      ) : null}
      <Notify
        handleClose={handleClose}
        open={open}
        message={message.message}
        severity={message.severity}
      />
    </Box>
  );
};

export default ProDetails;
