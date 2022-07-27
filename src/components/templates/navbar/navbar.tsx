import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Link, NavLink, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { iCount } from "../../interface.page";
import Notify from "../notify/notify.template";

const drawerWidth = "35%";
const navItems = ["Home", "Categories", "About", "Contact"];
const categories = ["Men", "Women", "Accessories"];

const Navbar = ({ count }: iCount) => {
  //   const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [categ, setCateg] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCateg, setAnchorElCateg] = React.useState<null | HTMLElement>(
    null
  );

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleNotifyClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCategoriesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCateg(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElCateg(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const math = Math;

  const location = useLocation();

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white" }}>
        <AlternateEmailIcon /> Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: string, i: number) => {
          return String(item.toLowerCase()) === String("home") ? (
            <ListItem key={math.random()} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  textAlign: "left",
                }}
                onClick={handleDrawerToggle}
                key={math.random()}
                component={NavLink}
                to="/"
                selected={String("/") === location.pathname}
              >
                <ListItemText primary={item} key={math.random()} />
              </ListItemButton>
            </ListItem>
          ) : String(item.toLowerCase()) === String("categories") ? (
            <>
              <ListItem key={math.random()} disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      color: "white",
                    },
                    textAlign: "left",
                  }}
                  onClick={() => (categ ? setCateg(false) : setCateg(true))}
                  key={math.random()}
                >
                  <ListItemText primary={item} key={math.random()} />
                </ListItemButton>
              </ListItem>

              {categ ? (
                <>
                  <Divider />
                  {categories.map((item: string, i: number) => (
                    <ListItem
                      key={math.random()}
                      disablePadding
                      sx={{ pl: "10%" }}
                    >
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            color: "white",
                          },
                          textAlign: "left",
                        }}
                        key={math.random()}
                        component={NavLink}
                        to={"/" + item.toLowerCase()}
                        selected={
                          String("/" + item.toLowerCase()) === location.pathname
                        }
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText primary={item} key={math.random()} />
                      </ListItemButton>
                    </ListItem>
                  ))}

                  <Divider />
                </>
              ) : null}
            </>
          ) : (
            <ListItem key={math.random()} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  textAlign: "left",
                }}
                onClick={handleDrawerToggle}
                key={math.random()}
                component={NavLink}
                to={"/" + item.toLowerCase()}
                selected={
                  String("/" + item.toLowerCase()) === location.pathname
                }
              >
                <ListItemText primary={item} key={math.random()} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  //   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ width: "90%", background: "#333333", mt: "0" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "true", sm: "true", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <AlternateEmailIcon /> Logo
          </Typography>
          <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}>
            {navItems.map((item: string, i: number) => {
              let path = String("/" + item.toLowerCase());

              return String(path) === String("/home") ? (
                <Button
                  key={i}
                  sx={{
                    "&:hover": {
                      color: "white",
                    },

                    color: "white",
                    background:
                      String("/") === location.pathname
                        ? "rgba(0, 0, 0, 0.30)"
                        : "transparent",
                  }}
                  component={NavLink}
                  to="/"
                >
                  {item}
                </Button>
              ) : String(path) === String("/categories") ? (
                <Button
                  key={i}
                  sx={{ color: "#fff" }}
                  onClick={handleCategoriesMenu}
                >
                  {item}
                </Button>
              ) : (
                <Button
                  key={i}
                  to={path}
                  sx={{
                    "&:hover": {
                      color: "white",
                    },

                    color: "white",
                    background:
                      String(path) === location.pathname
                        ? "rgba(0, 0, 0, 0.30)"
                        : "transparent",
                  }}
                  component={NavLink}
                >
                  {item}
                </Button>
              );
            })}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElCateg}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElCateg)}
              onClose={handleClose}
            >
              {categories.map((item, i) => {
                return (
                  <MenuItem
                    onClick={handleClose}
                    key={i}
                    component={NavLink}
                    to={"/" + item.toLowerCase()}
                    sx={{
                      "&:hover": {
                        color: "white",
                      },

                      color: "white",
                      background:
                        String("/" + item.toLowerCase()) === location.pathname
                          ? "rgba(0, 0, 0, 0.30)"
                          : "transparent",
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          {auth ? (
            <Box
              sx={{
                display: "flex",
                paddingLeft: { sm: 0 },
                flexGrow: 0,
              }}
            >
              <Box
                sx={{
                  display: { xs: "true", sm: "true", md: "none" },
                  margin: "auto",

                  width: "100%",
                }}
              >
                <TextField
                  id="outlined-search"
                  label="Search"
                  type="search"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              </Menu>

              {count ? (
                <Badge
                  badgeContent={count ? count.length : 0}
                  color="primary"
                  sx={{
                    mx: "1%",
                    display: { xs: "true", sm: "true", md: "none" },
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
                    display: { xs: "true", sm: "true", md: "none" },
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
                    onClick={handleClick}
                  >
                    <ShoppingCartSharpIcon />
                  </IconButton>
                </Badge>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                paddingLeft: { sm: 0 },
                flexGrow: 0,
              }}
            >
              <Box
                sx={{
                  display: { xs: "true", sm: "true", md: "none" },
                  width: "100%",
                }}
              >
                <TextField
                  id="outlined-search"
                  label={<SearchIcon />}
                  type="search"
                  size="small"
                />
              </Box>

              <Button
                to="/login"
                sx={{
                  "&:hover": {
                    color: "white",
                  },

                  background:
                    String("/login") === location.pathname
                      ? "rgba(0, 0, 0, 0.30)"
                      : "transparent",
                }}
                component={NavLink}
                color="primary"
              >
                SignIn
              </Button>
              <Button
                to="/signup"
                sx={{
                  "&:hover": {
                    color: "white",
                  },

                  background:
                    String("/signup") === location.pathname
                      ? "rgba(0, 0, 0, 0.30)"
                      : "transparent",
                }}
                component={NavLink}
                color="secondary"
              >
                SignUp
              </Button>
              <Badge
                badgeContent={4}
                color="primary"
                sx={{
                  mx: "1%",
                  display: { xs: "true", sm: "true", md: "none" },
                  "& .MuiBadge-badge": {
                    right: 8,
                    top: 8,
                    padding: "4px 4px",
                  },
                }}
              >
                <IconButton>
                  <ShoppingCartSharpIcon color="secondary" />
                </IconButton>
              </Badge>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "true", sm: "true", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Notify
        handleClose={handleNotifyClose}
        open={open}
        message={"Cart Is Empty"}
        severity={"info"}
      />
    </>
  );
};

export default Navbar;
