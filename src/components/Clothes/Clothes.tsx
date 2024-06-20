// components/Clothes/Clothes.tsx

import React from "react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Clothes: React.FC<{
  items: { image: string; title: string; link: string }[];
}> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ display: "flex", alignItems: "center", padding: 1 }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "80px",
                height: "auto",
                borderRadius: "8px",
                marginRight: "16px",
              }}
            />
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{fontWeight: "bold", fontSize: "20px"}}>{item.title}</Typography>
              <IconButton href={item.link}>
                <ArrowForwardIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Clothes;
