import React, { useEffect, useState } from "react";
import Layout from "./components/templates/layout/layout";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import SandBox from "./components/templates/sandbox/sandbox";
import AdminLogin from "./components/pages/dashboard/admin.login.section";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dashboard from "./components/pages/dashboard/Dashboard";
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
  const [openDialog, setOpenDialog] = useState<iOpenDialog>({
    value: false,
    id: "",
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Routes>
          <Route
            path="/*"
            element={<Layout dialogProps={{ openDialog, setOpenDialog }} />}
          />
          <Route path="/admin/:id" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={<Dashboard dialogProps={{ openDialog, setOpenDialog }} />}
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
