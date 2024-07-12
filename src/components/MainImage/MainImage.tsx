// components/MainImage/MainImage.tsx

import React from "react";
import { Card, CardMedia } from "@mui/material";

const MainImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Main"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Card>
  );
};

export default MainImage;
