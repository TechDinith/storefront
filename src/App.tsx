import React, { useEffect, useState } from "react";
import Layout from "./components/templates/layout/layout";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Route, Routes, useLocation } from "react-router-dom";
import SandBox from "./components/templates/sandbox/sandbox";
import AdminLogin from "./components/pages/dashboard/admin.login.section";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dashboard from "./components/pages/dashboard/Dashboard";
// import { iProducts } from "./components/templates/product-details/interface.productdetails";
import { iOpenDialog } from "./components/templates/dialog/dialog.interface";
import Landing from "./components/pages/landing/landing.page";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const darkTheme = responsiveFontSizes(theme);

//use usecallback function for performence
function App() {
  const location = useLocation();
  // const [products, setProducts] = useState<iProducts[] | [] | any>([]);
  const [openDialog, setOpenDialog] = useState<iOpenDialog>({
    value: false,
    id: "",
  });

  // useEffect(() => {
  //replace with async
  const products = [
    {
      id: "1",
      image: "prod1.jpg",
      isColor: false,
      name: "Sample Item 1",
      price: "1500.5",
      category: "men",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      enteredOn: new Date(),
    },
    {
      id: "2",
      image: "prod2.jpg",
      isColor: false,
      name: "Sample Item 2",
      price: 1400.5,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      category: "men",
      enteredOn: new Date(),
    },
    {
      id: "3",
      image: "prod3.jpg",
      isColor: false,
      name: "Sample Item 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1540.5",
      category: "women",
      enteredOn: new Date(),
    },
    {
      id: "4",
      image: "prod4.jpg",
      isColor: false,
      name: "Sample Item 4",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1504.5",
      category: "women",
      enteredOn: new Date(),
    },
    {
      id: "5",
      image: null,
      isColor: true,
      name: "Sample Item 5",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "150.5",
      colors: [
        { id: "7", image: "prod5-black.jpg", color: "black" },
        { id: "8", image: "prod5-red.jpg", color: "red" },
        { id: "9", image: "prod5-white.jpg", color: "white" },
      ],
      category: "women",
      enteredOn: new Date(),
    },
    {
      id: "6",
      image: "prod6.jpg",
      category: "women",
      isColor: false,
      name: "Sample Item 6",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1500",
      enteredOn: new Date(),
    },
  ] as any;
  // }, [location]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Routes>
          {/* <Route
            path="/*"
            element={
              <Layout
               
                dialogProps={{ openDialog, setOpenDialog }}
                products={products}
              />
            }
          /> */}
          <Route path="/admin/:id" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <Dashboard
                dialogProps={{ openDialog, setOpenDialog }}
                products={products}
              />
            }
          />
          <Route path="/admin/landing" element={<Landing />} />
          <Route path="/sand" element={<SandBox />} />
          <Route
            path="/notfound"
            element={
              <Box sx={{ my: "10%" }}>
                <Typography color="white" variant="h1" textAlign="center">
                  <b>404</b>
                </Typography>
                <Typography color="white" variant="h4" textAlign="center">
                  Nothing to see here!
                </Typography>
              </Box>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
