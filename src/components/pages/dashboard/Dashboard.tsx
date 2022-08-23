import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "../../sections/admin/listItems";
import Orders from "../../sections/admin/orders.section.";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { iDashboard, iDashboardContent } from "./dashboard.interface";
import Products from "../../sections/admin/products.section";
import Users from "../../sections/admin/users/users.section";
import Admins from "../../sections/admin/admins/admins.section";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Tooltip } from "antd";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../auth/firebase/firebase.config";
import { getAdminsByUid } from "../../../auth/firebase/firebase.admin.functions";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer: any = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent({
  state,
  sectionName,
  dialogProps,
  authUser,
}: iDashboardContent) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const AdminAppbar = () => {
    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          console.log("out");
        })
        .catch((error) => {
          console.log("out err", error);
        });
    };
    return (
      <AppBar position="absolute" open={open}>
        <Box display="flex" alignItems="center">
          <Grid container alignItems="center">
            <Grid item xs={7} sm={11}>
              <Toolbar
                sx={{
                  pr: "24px",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  {sectionName.toLocaleUpperCase()}
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item justifyContent="left" alignItems="center" xs={5} sm={1}>
              <Box display="flex" alignItems="center">
                <Tooltip
                  title={
                    <Typography variant="caption">
                      {authUser.email}
                      <br />
                      {authUser.role}
                    </Typography>
                  }
                >
                  <AdminPanelSettingsIcon color="action" />
                </Tooltip>
                <IconButton onClick={handleLogout}>
                  <LogoutIcon color="error" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    );
  };

  const AdminDrawer = () => {
    return (
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" onClick={() => setOpen(false)}>
          <MainListItems state={state} />
        </List>
      </Drawer>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminAppbar />
      <AdminDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Navigate to="/admin/dashboard/orders" state={state} />
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <Orders
                        dialogProps={dialogProps}
                        sectionName={sectionName}
                      />
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <Products
                        dialogProps={dialogProps}
                        sectionName={sectionName}
                      />
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <Users
                        dialogProps={dialogProps}
                        sectionName={sectionName}
                      />
                    }
                  />
                  <Route
                    path="/admins"
                    element={
                      <Admins
                        authUser={authUser}
                        dialogProps={dialogProps}
                        sectionName={sectionName}
                      />
                    }
                  />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default function Dashboard({ dialogProps }: iDashboard) {
  const { state, pathname }: any = useLocation();
  const navigate = useNavigate();
  const sectionName = pathname.substring(17);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        getAdminsByUid(user.uid).then((doc) => {
          if (doc && doc.authId) {
            setAuthUser({
              ...doc,
            } as any);
          } else {
            navigate("/notfound");
          }
        });
      } else {
        navigate("/notfound");
      }
    });
  }, [pathname]);

  return authUser ? (
    <DashboardContent
      authUser={authUser}
      state={state}
      sectionName={sectionName}
      dialogProps={dialogProps}
    />
  ) : (
    <></>
  );
}
