import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import ConsecutiveSnackbars from "../notify/notify.template";
import { iHeader } from "./header.interfaces";

const Header = ({ countProps, notifyProps }: iHeader) => {
  return (
    <Grid
      container
      bgcolor="black"
      sx={{
        py: "1%",
        display: { xs: "none", sm: "none", md: "flex" },
        mb: "1%",
        p: "1%",
      }}
    >
      <Grid item xs={6}>
        <Typography
          variant="body2"
          color="white"
          textTransform="uppercase"
          sx={{ mt: "1%" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Grid>

      <Grid item xs={6} container direction="row" justifyContent="flex-end">
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          sx={{ color: "white" }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {countProps.count ? (
          <Badge
            badgeContent={countProps.count ? countProps.count.length : 0}
            color="primary"
            sx={{
              mx: "1%",
              "& .MuiBadge-badge": {
                right: 8,
                top: 8,
                padding: "4px 4px",
              },
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  color: "white",
                },
              }}
              color="secondary"
              component={NavLink}
              to="/cart"
            >
              <ShoppingCartSharpIcon />
            </IconButton>
          </Badge>
        ) : (
          <Badge
            badgeContent={0}
            color="primary"
            sx={{
              mx: "1%",
              "& .MuiBadge-badge": {
                right: 8,
                top: 8,
                padding: "4px 4px",
              },
            }}
          >
            <IconButton
              sx={{
                "&:hover": {
                  color: "white",
                },
              }}
              color="secondary"
              onClick={() =>
                notifyProps.handleNotificationClick({
                  message: "Cart Is Empty",
                  severity: "info",
                })
              }
            >
              <ShoppingCartSharpIcon />
            </IconButton>
          </Badge>
        )}
      </Grid>
      <ConsecutiveSnackbars
        message={notifyProps.message}
        setSnackPack={notifyProps.setSnackPack}
        snackPack={notifyProps.snackPack}
      />
    </Grid>
  );
};

export default Header;
