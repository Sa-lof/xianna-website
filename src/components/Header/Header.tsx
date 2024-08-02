import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const Header: React.FC<{
  title: string;
  description: string;
  category: string;
  chipColor: string;
}> = ({ title, description, category, chipColor }) => {
  return (
    <Box sx={{ alignItems: "center", marginBottom: 4 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 1, fontSize: {
            xs: '46px', 
            sm: '50px',
            md: '54px',
            lg: '58px',
          }, }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, fontSize: {
                xs: '26px', 
                sm: '28px',
                md: '30px',
                lg: '32px',
              }, }}>
          {description}
        </Typography>
        <Chip
          label={category}
          sx={{
            backgroundColor: chipColor,
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
            padding: 2.5,
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
