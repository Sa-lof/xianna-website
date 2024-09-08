import React from "react";
import { Box, Typography } from "@mui/material";

const Content: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Box>
      <Typography 
        variant="body1" 
        sx={{ 
          marginBottom: 4, 
          fontSize: {
            xs: '16px', 
            sm: '16px',
            md: '18px',
            lg: '20px',
          }, 
        }}
        dangerouslySetInnerHTML={{ __html: content }} // Renderiza el contenido como HTML
      />
    </Box>
  );
};

export default Content;
