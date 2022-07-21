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
import { Link } from "react-router-dom";

interface Props {
  //
}

const drawerWidth = "35%";
const navItems = ["Home", "Categories", "About", "Contact"];
const categories = ["Men", "Women", "Accessories"];
const Navbar = (props: Props) => {
  //   const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [categ, setCateg] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCateg, setAnchorElCateg] = React.useState<null | HTMLElement>(
    null
  );

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

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white" }}>
        <AlternateEmailIcon /> Logo
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: string) => {
          return String(item.toLowerCase()) === String("home") ? (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleDrawerToggle}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={item} />
                </Link>
              </ListItemButton>
            </ListItem>
          ) : String(item.toLowerCase()) === String("categories") ? (
            <>
              <ListItem key={item} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "left" }}
                  onClick={() => (categ ? setCateg(false) : setCateg(true))}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>

              {categ ? (
                <>
                  <Divider />
                  {categories.map((item: string) => (
                    <ListItem key={item} disablePadding sx={{ pl: "10%" }}>
                      <ListItemButton sx={{ textAlign: "left" }}>
                        <Link
                          to={"/" + item.toLowerCase()}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemText primary={item} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  ))}

                  <Divider />
                </>
              ) : null}
            </>
          ) : (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleDrawerToggle}
              >
                <Link
                  to={"/" + item.toLowerCase()}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={item} />
                </Link>
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
            {navItems.map((item: string) => {
              let path = String("/" + item.toLowerCase());

              return String(path) === String("/home") ? (
                <Button key={item} sx={{ color: "#fff" }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item}
                  </Link>
                </Button>
              ) : String(path) === String("/categories") ? (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={handleCategoriesMenu}
                >
                  {item}
                </Button>
              ) : (
                <Button key={item} sx={{ color: "#fff" }}>
                  <Link
                    to={path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item}
                  </Link>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Sign Out</MenuItem>
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
                  label="Search field"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              </Menu>
              <Button sx={{ display: { xs: "true", sm: "true", md: "none" } }}>
                <ShoppingCartSharpIcon color="secondary" />
              </Button>
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
                  label="Search field"
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
              <Button color="primary">Login</Button>
              <Button color="secondary">SignUp</Button>
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
    </>
  );
};

export default Navbar;
