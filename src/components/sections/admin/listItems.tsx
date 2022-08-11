import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
const MainListItems = ({ state }: any) => {
  const location = useLocation();
  return (
    <Fragment>
      <ListItemButton
        selected={String("/admin/dashboard/orders") === location.pathname}
        component={NavLink}
        to="/admin/dashboard/orders"
        state={state}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>

      <ListItemButton
        selected={String("/admin/dashboard/products") === location.pathname}
        component={NavLink}
        to="/admin/dashboard/products"
        state={state}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>

      <ListItemButton
        selected={String("/admin/dashboard/users") === location.pathname}
        component={NavLink}
        to="/admin/dashboard/users"
        state={state}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>

      <ListItemButton
        selected={String("/admin/dashboard/admins") === location.pathname}
        component={NavLink}
        to="/admin/dashboard/admins"
        state={state}
      >
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Admins" />
      </ListItemButton>
    </Fragment>
  );
};

export default MainListItems;
