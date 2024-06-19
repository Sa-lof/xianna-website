import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";

interface CatalogCardProps {
  id: string;
  image: string;
  title: string;
  link: string;
}

const CatalogCard: React.FC<CatalogCardProps> = ({
  id,
  image,
  title,
  link,
}) => {
  return (
    <Card
      className="flex flex-col h-full"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px", // Fixed height for all cards
        padding: 2,
      }}
    >
      <CardContent
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: 4 }}
        >
          {title}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "auto",
        }}
      >
        <SmallButton backgroundColor="white" arrowColor="black" link={link} />
      </Box>
    </Card>
  );
};

export default CatalogCard;
