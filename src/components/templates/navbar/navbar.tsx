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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { NavLink, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { iNavbar } from "./navbar.interfaces";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import { AccountCircleOutlined } from "@mui/icons-material";
import Search from "../../sections/search/search.section";
import { userLogout } from "../../../auth/firebase/firebase.users.functions";
import { capitalize } from "@mui/material";

const drawerWidth = "35%";
const navItems = ["Home", "Categories", "About", "Contact"];

const Navbar = ({
  countProps,
  setNotify,
  authProps,
  products,
  categories,
}: iNavbar) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [categ, setCateg] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCateg, setAnchorElCateg] = React.useState<null | HTMLElement>(
    null
  );

  const location = useLocation();
  const ancorRef = React.useRef(null);

  React.useLayoutEffect(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = () => {
    userLogout();
    authProps.setAuthUser();
    setAnchorEl(null);
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

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white" }}>
        <AlternateEmailIcon /> Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: string, i: number) => {
          return String(item.toLowerCase()) === String("home") ? (
            <ListItem key={i} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  textAlign: "left",
                }}
                onClick={handleDrawerToggle}
                component={NavLink}
                to="/"
                selected={String("/") === location.pathname}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ) : String(item.toLowerCase()) === String("categories") ? (
            <React.Fragment key={i}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      color: "white",
                    },
                    textAlign: "left",
                  }}
                  onClick={() => (categ ? setCateg(false) : setCateg(true))}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>

              {categ ? (
                <React.Fragment>
                  <Divider />
                  {categories.map((item: string, i: number) => (
                    <ListItem key={i} disablePadding sx={{ pl: "10%" }}>
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            color: "white",
                          },
                          textAlign: "left",
                        }}
                        component={NavLink}
                        to={"/" + item.toLowerCase()}
                        selected={
                          String("/" + item.toLowerCase()) === location.pathname
                        }
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText primary={capitalize(item)} />
                      </ListItemButton>
                    </ListItem>
                  ))}

                  <Divider />
                </React.Fragment>
              ) : null}
            </React.Fragment>
          ) : (
            <ListItem key={i} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    color: "white",
                  },
                  textAlign: "left",
                }}
                onClick={handleDrawerToggle}
                component={NavLink}
                to={"/" + item.toLowerCase()}
                selected={
                  String("/" + item.toLowerCase()) === location.pathname
                }
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

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
                      textTransform: "uppercase",
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
          {authProps.authUser ? (
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

                  width: "40vw",
                }}
              >
                <Search label={<SearchIcon />} options={products} />
              </Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{
                  color: "inherit",
                }}
              >
                <AccountCircleOutlined />
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
                <Card>
                  <Box sx={{ p: 2, display: "flex" }}>
                    <Stack spacing={0.5}>
                      <Typography color="white">
                        <b>{authProps.authUser.displayName}</b>
                      </Typography>
                      <Box display="flex" sx={{ alignItems: "center" }}>
                        <EmailIcon sx={{ color: "grey[500]", mr: "2%" }} />{" "}
                        <Typography variant="body2" color="text.secondary">
                          {authProps.authUser.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Card>
                <MenuItem onClick={handleSignOut} ref={ancorRef}>
                  Sign Out
                </MenuItem>
              </Menu>

              {countProps.count && countProps.count.length > 0 ? (
                <Badge
                  badgeContent={countProps.count.length}
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
                      setNotify({
                        message: "Cart Is Empty",
                        severity: "info",
                      })
                    }
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
                  width: "30vw",
                }}
              >
                <Search label={<SearchIcon />} options={products} />
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

              {countProps.count && countProps.count.length > 0 ? (
                <Badge
                  badgeContent={countProps.count.length}
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
                      setNotify({
                        message: "Cart Is Empty",
                        severity: "info",
                      })
                    }
                  >
                    <ShoppingCartSharpIcon />
                  </IconButton>
                </Badge>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
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
    </>
  );
};

export default Navbar;
