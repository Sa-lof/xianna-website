import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

const BlogImages: React.FC<{ images: string[] }> = ({ images }) => {
  const getGridItemProps = (index: number) => {
    switch (index) {
      case 0:
        return { xs: 12, sm: 6, md: 6, height: "300px" }; // Large horizontal
      case 1:
        return { xs: 12, sm: 3, md: 3, height: "300px" }; // Smaller square
      case 2:
        return { xs: 12, sm: 3, md: 3, height: "300px" }; // Smaller square
      case 3:
        return { xs: 12, sm: 6, md: 4, height: "300px" }; // Smaller horizontal
      case 4:
        return { xs: 12, sm: 6, md: 8, height: "300px" }; // Large horizontal
      default:
        return { xs: 12, sm: 6, md: 4, height: "300px" }; // Default size
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 5 }}>
      {images.map((image, index) => (
        <Grid item {...getGridItemProps(index)} key={index}>
          <Card sx={{ overflow: "hidden", height: "100%" }}>
            <CardMedia
              component="img"
              image={image}
              alt={`Blog ${index}`}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogImages;
