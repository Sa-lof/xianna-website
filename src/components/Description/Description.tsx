// components/Description/Description.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

const Description: React.FC<{ description: string }> = ({ description }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="body1" sx={{fontSize: {
                  xs: '16px', 
                  sm: '18px',
                  md: '20px',
                  lg: '22px',
                },}}>{description}</Typography>
    </Box>
  );
};

export default Description;
