import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import getTheme from "./GetTheme.tsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(getTheme("light"))}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
