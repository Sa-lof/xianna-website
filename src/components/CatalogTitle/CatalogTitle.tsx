// src/components/CatalogTitle/CatalogTitle.tsx

import React from "react";
import { Grid, Typography, Chip } from "@mui/material";

const CatalogTitle: React.FC<{
  title: string;
  category: string;
  chipColor: string;
}> = ({ title, category, chipColor }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 8 }}>
      <Grid item xs={12} md={10}>
        <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "64px" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={2} sx={{ textAlign: "right" }}>
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
      </Grid>
    </Grid>
  );
};

export default CatalogTitle;
