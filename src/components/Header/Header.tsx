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
            xs: '24px', 
            sm: '28px',
            md: '32px',
            lg: '40px',
          }, }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, fontSize: {
                xs: '18px', 
                sm: '20px',
                md: '22px',
                lg: '24px',
              }, }}>
          {description}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, fontSize: '16px'}}>
          Por Betsabe Calatayud
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
