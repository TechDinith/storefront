import React from "react";
import Layout from "./components/templates/layout/layout";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}></Route>
            <Route path="/sand" element={<SandBox />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
