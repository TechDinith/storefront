import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Image } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { iProdDetails } from "./interface.productdetails";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StartIcon from "@mui/icons-material/Start";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ConsecutiveSnackbars from "../notify/notify.template";
import AlertDialog from "../dialog/dialog.template";
import Paper from "@mui/material/Paper";

const ProDetails = ({
  cart,
  countProps,
  notifyProps,
  isCart,
  preview,
  latest,
  dialogProps,
  handleClickCloseSearchResult,
}: iProdDetails) => {
  const { state }: any = useLocation();

  const [selectedProduct, setSelectedProduct] = useState({
    image: cart.image ? cart.image : cart.colors ? cart.colors[0].image : null,
    color: cart.colors ? cart.colors[0] : "transparent",
  });

  const handleAddToCart = () => {
    let cartItem = {
      id: cart.id,
      image: selectedProduct.image,
      category: cart.category,
      isColor: cart.isColor,
      name: cart.name,
      price: cart.price,
      addedOn: new Date(),
      colors: [{ imgae: selectedProduct.image, color: selectedProduct.color }],
      orderedOn: cart.orderedOn,
    };

    console.log(cart.orderedOn);

    let isMatch: any =
      countProps?.count !== null
        ? countProps?.count.map((item: any) => {
            return item.id === cartItem.id ? true : false;
          })
        : false;

    if (countProps?.count !== null && isMatch.includes(true)) {
      notifyProps.handleNotificationClick({
        message: "Item Already Added!",
        severity: "info",
      });
    } else {
      if (countProps?.count === null) {
        countProps!.setCount([cartItem]);
        localStorage.setItem("cart", JSON.stringify([cartItem]));
      } else {
        countProps!.setCount([...countProps!.count, cartItem]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...countProps!.count, cartItem])
        );
      }

      notifyProps.handleNotificationClick({
        message: "Item Added!",
        severity: "success",
      });
    }
    if (handleClickCloseSearchResult) handleClickCloseSearchResult();
  };

  const handleRemove = () => {
    dialogProps?.setOpenDialog(false);
    let localCart = localStorage.getItem("cart");
    let jsonCart = JSON.parse(typeof localCart === "string" ? localCart : "");

    let cartItems = jsonCart.filter(
      (product: any) => String(product.id).trim() !== String(cart.id).trim()
    );
    if (cartItems.length) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      countProps!.setCount(cartItems);
    } else {
      notifyProps.handleNotificationClick({
        message: "Cart is Empty!",
        severity: "error",
      });
      localStorage.removeItem("cart");
      countProps!.setCount(null);
    }
  };

  const handleDialogOpen = () => {
    dialogProps?.setOpenDialog(true);
  };

  return (
    <Box
      justifyContent="center"
      textAlign={"center"}
      color="white"
      component={Paper}
      elevation={state ? (state.value.id === cart.id ? 0 : 20) : 20}
    >
      {isCart ? (
        <Box>
          <IconButton onClick={handleDialogOpen}>
            <RemoveCircleOutlineIcon fontSize="large" color="error" />
          </IconButton>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.color}
            preview={preview}
          />
        </Box>
      ) : (
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.color}
          preview={preview}
        />
      )}

      <Typography variant="h6" color="inherit" textTransform="uppercase">
        {cart.name && cart.name}
      </Typography>
      <Typography variant="body1" color="cyan" textTransform="uppercase">
        {cart.price && cart.price}
      </Typography>

      {cart.isColor ? (
        isCart ? (
          <Box display="flex" justifyContent={"center"}>
            {cart.colors &&
              cart.colors.map((item: any, i: number) => (
                <CircleIcon key={i} sx={{ color: item.color }} />
              ))}
          </Box>
        ) : (
          <Box display="flex" justifyContent={"center"}>
            {cart.colors &&
              cart.colors.map((item: any, i: number) => (
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
      ) : latest ? null : isCart ? (
        <Box display="flex" justifyContent={"center"}>
          <CircleIcon sx={{ color: "transparent" }} />
        </Box>
      ) : (
        <Box display="flex" justifyContent={"center"}>
          <IconButton disabled>
            <CircleIcon sx={{ color: "transparent" }} />
          </IconButton>
        </Box>
      )}
      {isCart ? (
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
          disabled={cart.orderedOn ? true : false}
        >
          {cart.orderedOn ? (
            "Order will receive within 15 days"
          ) : (
            <>
              <FavoriteBorderIcon sx={{ mr: "4%" }} /> Lorem ipsum
            </>
          )}
        </Button>
      ) : latest ? (
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
          to={"/" + cart.category}
        >
          <StartIcon sx={{ mr: "4%" }} /> Lorem ipsum
        </Button>
      ) : cart.category ? (
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
      <ConsecutiveSnackbars
        message={notifyProps.message}
        setSnackPack={notifyProps.setSnackPack}
        snackPack={notifyProps.snackPack}
      />
      <AlertDialog
        attributes={{
          title: "Lorem ipsum?",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, incidunt minus. Molestiae error soluta culpa autem saepe aliquam dolor eius, quibusdam, ipsam corporis quis enim alias eligendi optio. Suscipit, at?",
          yesBtn: "Lorem ipsum",
          yesFunction: handleRemove,
          noBtn: "dolor sit",
        }}
        openDialog={dialogProps?.openDialog ? dialogProps?.openDialog : false}
        setOpenDialog={dialogProps?.setOpenDialog}
      />
    </Box>
  );
};

export default ProDetails;
