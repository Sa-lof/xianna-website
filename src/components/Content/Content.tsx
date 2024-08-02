import React from "react";
import { Box, Typography } from "@mui/material";

const Content: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ marginBottom: 4, fontSize: {
                xs: '16x', 
                sm: '16px',
                md: '18px',
                lg: '20px',
              }, }}>
        {content}
      </Typography>
    </Box>
  );
};

export default Content;
