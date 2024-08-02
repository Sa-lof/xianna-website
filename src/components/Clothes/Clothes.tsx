import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";

interface ClothesProps {
  items: { image: string; title: string; link: string }[];
}

const Clothes: React.FC<ClothesProps> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Card
            className="flex flex-col h-full"
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              height: "150px",
              padding: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.7)", // Darkens the image
              }}
            />
            <CardContent
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                width: "calc(100% - 32px)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "24px" }}
              >
                {item.title}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "auto",
                position: "absolute",
                bottom: 16,
                right: 16,
              }}
            >
              <SmallButton link={item.link} backgroundColor="white" arrowColor="black" />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Clothes;
