import React from "react";
import { Box, Typography } from "@mui/material";

const Content: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        {content}
      </Typography>
    </Box>
  );
};

export default Content;
