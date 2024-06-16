// src/pages/Home.tsx

import React from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import { Box } from "@mui/material";
import "../../src/App.css";
import Footer from "../components/Footer/Footer";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        paddingBottom: 10, // Responsive padding
        paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingTop: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full viewport height
        }}
      >
        <MainGrid />
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
