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
import { iProducts } from "./components/templates/product-details/interface.productdetails";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const darkTheme = responsiveFontSizes(theme);

function App() {
  const location = useLocation();
  const [products, setProducts] = useState<iProducts[] | [] | any>([]);

  useEffect(() => {
    //replace with async
    setProducts([
      {
        id: "1",
        image: "prod1.jpg",
        isColor: false,
        name: "Sample Item 1",
        price: "1500.5",
        category: "men",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        enteredOn: "02/04/2022",
      },
      {
        id: "2",
        image: "prod2.jpg",
        isColor: false,
        name: "Sample Item 2",
        price: 1400.5,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        category: "men",
        enteredOn: "02/05/2022",
      },
      {
        id: "3",
        image: "prod3.jpg",
        isColor: false,
        name: "Sample Item 3",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: "1540.5",
        category: "women",
        enteredOn: "02/06/2022",
      },
      {
        id: "4",
        image: "prod4.jpg",
        isColor: false,
        name: "Sample Item 4",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: "1504.5",
        category: "women",
        enteredOn: "02/07/2022",
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
        enteredOn: "02/08/2022",
      },
      {
        id: "6",
        image: "prod6.jpg",
        category: "women",
        isColor: false,
        name: "Sample Item 6",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
        price: "1500",
        enteredOn: "02/09/2022",
      },
    ]);
  }, [location]);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Layout products={products} />} />
          <Route path="/admin/:id" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={<Dashboard products={products} />}
          />
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
