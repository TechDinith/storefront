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
import ConsecutiveSnackbars from "../notify/notify.template";
import AlertDialog from "../dialog/dialog.template";
import Paper from "@mui/material/Paper";
import InventoryIcon from "@mui/icons-material/Inventory";
import TextField from "@mui/material/TextField";

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
    id: cart.image ? cart.id : cart.colors ? cart.colors[0].id : null,
    image: cart.image ? cart.image : cart.colors ? cart.colors[0].image : null,
    color: cart.colors ? cart.colors[0] : "transparent",
  });
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = () => {
    let cartItem = {
      id: selectedProduct.id,
      image: selectedProduct.image,
      category: cart.category,
      isColor: cart.isColor,
      name: cart.name,
      price: cart.price,
      addedOn: new Date(),
      colors: [{ imgae: selectedProduct.image, color: selectedProduct.color }],
      orderedOn: cart.orderedOn,
      desc: cart.desc,
      quantity: quantity,
    };

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
      notifyProps.handleNotificationClick({
        message: "Item Removed!",
        severity: "info",
      });
    } else {
      notifyProps.handleNotificationClick({
        message: "Cart is Empty!",
        severity: "error",
      });
      localStorage.removeItem("cart");
      countProps!.setCount(null);
    }
    dialogProps?.setOpenDialog({ value: false, id: "" });

    setTimeout(() => {
      window.location.reload();
    }, 10);
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
              key={selectedProduct.image}
              src={require(`../../../images/${selectedProduct.image}`)}
              alt={selectedProduct.image}
              preview={preview}
            />
            ;
          </>
        </Box>
      ) : (
        <>
          <Image
            src={require(`../../../images/${selectedProduct.image}`)}
            alt={selectedProduct.image}
            key={selectedProduct.image}
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
              {cart.colors &&
                cart.colors.map((item: any, i: number) => (
                  <CircleIcon key={i} sx={{ color: item.color }} />
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
          <StartIcon sx={{ mr: "4%" }} /> Lorem ipsum
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
        openDialog={
          dialogProps?.openDialog ? dialogProps?.openDialog : { value: false }
        }
        setOpenDialog={dialogProps?.setOpenDialog}
      />
    </Box>
  );
};

export default ProDetails;
