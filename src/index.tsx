// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client"; // Note the change here
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactGA from "react-ga";  // Importar ReactGA

// Inicializa Google Analytics con tu tracking ID
const trackingId = "G-Z29X3H1VNJ";  // Reemplaza con tu ID de Google Analytics
ReactGA.initialize(trackingId);  // Inicialización de Google Analytics
ReactGA.initialize(trackingId, { gaOptions: { cookieFlags: 'SameSite=None; Secure' } });
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot here
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
