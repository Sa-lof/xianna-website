// src/pages/Home.tsx

import React, { useState, useEffect } from "react";
import MainGrid from "../components/MainGrid/MainGrid";
import { Box, Slide } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Same as the slide timeout

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Slide direction="down" in={!loading} mountOnEnter unmountOnExit timeout={2000}>
      <Box
        sx={{
          paddingBottom: 4, // Responsive padding
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
          paddingTop: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <MainGrid />
        </Box>

        <Footer />
      </Box>
    </Slide>
  );
};

export default Home;
