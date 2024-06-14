// src/pages/Home.tsx

import React from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import { Box } from "@mui/material";
import '../../src/App.css';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        padding: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
      }}
    >
      <MainGrid />
    </Box>
  );
};

export default Home;
