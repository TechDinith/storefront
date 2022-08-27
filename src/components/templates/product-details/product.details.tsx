import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import { Fragment, useState } from "react";
import { Image } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { iProdDetails } from "./interface.productdetails";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StartIcon from "@mui/icons-material/Start";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AlertDialog from "../dialog/dialog.template";
import Paper from "@mui/material/Paper";
import InventoryIcon from "@mui/icons-material/Inventory";
import TextField from "@mui/material/TextField";
import { deleteCartItem } from "../../../auth/firebase/firebase.cart.functions";

const ProDetails = ({
  cart,
  countProps,
  setNotify,
  isCart,
  preview,
  latest,
  dialogProps,
  handleClickCloseSearchResult,
  authProps,
}: iProdDetails) => {
  const { state }: any = useLocation();

  const [selectedProduct, setSelectedProduct] = useState({
    id: isCart ? cart.prodId : cart.colors ? cart.colors[0].id : cart.id,
    image: isCart
      ? cart.image
      : cart.image
      ? cart.urlList[0].name
      : cart.colors
      ? cart.urlList[0].name
      : null,
    color: isCart
      ? cart.colors
      : cart.colors
      ? cart.colors[0].color
      : "transparent",
    url: isCart
      ? cart.urlList
      : cart.image
      ? cart.urlList[0].url
      : cart.colors && cart.urlList[0].url,
  });
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = () => {
    let cartItem = {
      id: selectedProduct.id,
      prodId: cart.id,
      image: selectedProduct.image,
      category: cart.category,
      isColor: cart.isColor,
      name: cart.name,
      price: cart.price,
      addedOn: new Date().toLocaleString(),
      colors: selectedProduct.color,
      urlList: selectedProduct.url,
      orderedOn: cart.orderedOn,
      desc: cart.desc,
      quantity: quantity,
      authId: authProps?.authUser?.uid,
    };

    let isMatch: any =
      countProps?.count !== null
        ? countProps?.count.map((item: any) => {
            return item.id === cartItem.id ? true : false;
          })
        : false;

    if (countProps?.count !== null && isMatch.includes(true)) {
      setNotify({
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

      setNotify({
        message: "Item Added!",
        severity: "success",
      });
    }
    if (handleClickCloseSearchResult) handleClickCloseSearchResult();
  };

  const handleDialogOpen = () => {
    dialogProps?.setOpenDialog({ value: true, id: cart.id });
  };

  const handleRemove = () => {
    let localCart = localStorage.getItem("cart");
    let jsonCart = JSON.parse(typeof localCart === "string" ? localCart : "");

    let cartItems = jsonCart.filter(
      (product: any) =>
        String(product.id).trim() !== String(dialogProps?.openDialog.id).trim()
    );

    if (cartItems.length) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      countProps!.setCount(cartItems);
      //hamdle delete

      setNotify({
        message: "Item Removed!",
        severity: "info",
      });
    } else {
      localStorage.removeItem("cart");
      setNotify({
        message: "Cart is Empty!",
        severity: "error",
      });
      countProps!.setCount(null);
    }

    deleteCartItem(
      authProps?.authUser?.uid as string,
      dialogProps?.openDialog.id as string
    );
    dialogProps?.setOpenDialog({ value: false, id: "" });
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
          <>
            <IconButton onClick={handleDialogOpen}>
              <RemoveCircleOutlineIcon fontSize="large" color="error" />
            </IconButton>
            <Image
              key={
                selectedProduct.image
                  ? selectedProduct.image
                  : selectedProduct.color.image
              }
              src={selectedProduct.url}
              alt={
                selectedProduct.image
                  ? selectedProduct.image
                  : selectedProduct.color.image
              }
              preview={preview}
            />
          </>
        </Box>
      ) : (
        <>
          <Image
            key={
              selectedProduct.image
                ? selectedProduct.image
                : selectedProduct.color.image
            }
            src={selectedProduct.url}
            alt={
              selectedProduct.image
                ? selectedProduct.image
                : selectedProduct.color.image
            }
            preview={preview}
          />
        </>
      )}

      <Typography variant="h6" color="inherit" textTransform="uppercase">
        {cart.name && cart.name}
      </Typography>
      <Typography variant="body1" color="cyan">
        {cart.price && "Rs." + cart.price}
      </Typography>
      <Typography variant="subtitle2" color="pink">
        {cart.desc && cart.desc}
      </Typography>

      {cart.isColor ? (
        isCart ? (
          <>
            <Box display="flex" justifyContent={"center"}>
              {cart.colors && <CircleIcon sx={{ color: cart.colors }} />}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="body1" color="white" textAlign="center">
                Quantity :
              </Typography>
              <TextField
                id="outlined-number"
                label="Number"
                sx={{ ml: 1, width: "40%", mt: 1 }}
                value={cart.quantity}
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                size="small"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </>
        ) : latest ? null : (
          <>
            <Box display="flex" justifyContent={"center"}>
              {cart.colors &&
                cart.colors.map((item: any, i: number) => (
                  <Fragment key={i}>
                    <IconButton
                      key={i}
                      onClick={() =>
                        setSelectedProduct({
                          id: item.id,
                          image: item.image,
                          color: item.color,
                          url: cart.urlList[i].url,
                        })
                      }
                    >
                      <CircleIcon sx={{ color: item.color }} />
                    </IconButton>
                  </Fragment>
                ))}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="body1" color="white" textAlign="center">
                Quantity :
              </Typography>
              <TextField
                id="outlined-number"
                label="Number"
                sx={{ ml: 1, width: "40%", mt: 1 }}
                defaultValue={1}
                InputProps={{ inputProps: { min: 1 } }}
                type="number"
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </>
        )
      ) : latest ? null : isCart ? (
        <>
          <Box display="flex" justifyContent={"center"}>
            <CircleIcon sx={{ color: "transparent" }} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body1" color="white" textAlign="center">
              Quantity :
            </Typography>
            <TextField
              id="outlined-number"
              label="Number"
              sx={{ ml: 1, width: "40%", mt: 1 }}
              value={cart.quantity}
              InputProps={{ inputProps: { min: 1 } }}
              type="number"
              size="small"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent={"center"}>
            <IconButton disabled>
              <CircleIcon sx={{ color: "transparent" }} />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body1" color="white" textAlign="center">
              Quantity :
            </Typography>
            <TextField
              id="outlined-number"
              label="Number"
              sx={{ ml: 1, width: "40%", mt: 1 }}
              defaultValue={1}
              InputProps={{ inputProps: { min: 1 } }}
              type="number"
              size="small"
              onChange={(e) => setQuantity(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </>
      )}
      {isCart ? (
        <Button
          sx={{
            "&:hover": {
              color: "white",
            },
            mt: 1,
          }}
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          component={NavLink}
          to={"/checkout"}
          state={{ checkouts: [cart] }}
          disabled={cart.orderedOn ? true : false}
        >
          {cart.orderedOn ? (
            "Order will receive within 15 days"
          ) : (
            <>
              <InventoryIcon sx={{ mr: "4%" }} /> Lorem ipsum
            </>
          )}
        </Button>
      ) : latest ? (
        <Button
          sx={{
            "&:hover": {
              color: "white",
            },
            mt: 1,
          }}
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          component={NavLink}
          to={"/" + cart.category}
        >
          <StartIcon sx={{ mr: "4%" }} /> Take a Look
        </Button>
      ) : cart.category ? (
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={handleAddToCart}
          sx={{ mt: 1 }}
        >
          <ShoppingCartCheckoutIcon sx={{ mr: "4%" }} /> Add To Cart
        </Button>
      ) : null}

      <AlertDialog
        attributes={{
          title: "Lorem ipsum?",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, incidunt minus. Molestiae error soluta culpa autem saepe aliquam dolor eius, quibusdam, ipsam corporis quis enim alias eligendi optio. Suscipit, at?",
          yesBtn: "Lorem ipsum",
          yesFunction: handleRemove,
          noBtn: "dolor sit",
        }}
        openDialog={
          dialogProps?.openDialog ? dialogProps?.openDialog : { value: false }
        }
        setOpenDialog={dialogProps?.setOpenDialog}
      />
    </Box>
  );
};

export default ProDetails;
