import React from "react";
import Layout from "./components/templates/layout/layout";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import SandBox from "./components/templates/sandbox/sandbox";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const darkTheme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/sand" element={<SandBox />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
