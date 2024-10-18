import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";

interface BlogCardProps {
  id: string;
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  link: string;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  category,
  categoryColor,
  title,
  description,
  link,
  onClick,
}) => {
  return (
    <Card
      className="flex flex-col h-full"
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        height: "400px", // Ajusta la altura según tus necesidades
        padding: 0,
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
          zIndex: 0,
        }}
      />
      <Chip
        label={category}
        sx={{
          backgroundColor: categoryColor,
          borderRadius: "50px",
          padding: "4px 8px",
          color: "white",
          fontWeight: "bold",
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1,
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "white",
          padding: 2,
          boxSizing: "border-box",
          borderRadius: "0 0 16px 16px",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "16px", marginBottom: 2 }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <SmallButton backgroundColor={categoryColor} arrowColor="white" link={link} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

