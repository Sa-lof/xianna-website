// src/components/Loader/Loader.tsx

import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "#E61F93" }} />
    </Box>
  );
};

export default Loader;
