import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import SmallButton from "../SmallButton/SmallButton";

interface BlogCardProps {
  id: string;
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  category,
  categoryColor,
  title,
  description,
  link,
}) => {
  return (
    <Card
      className="flex flex-col h-full"
      sx={{ borderRadius: "16px", overflow: "hidden", position: "relative", padding: 2 }}
    >
      <CardContent className="p-0" sx={{ position: "relative" }}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          style={{ borderRadius: "inherit" }}
        />
        <Chip
          label={category}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: categoryColor,
            borderRadius: "50px",
            padding: "4px 8px",
            color: "white",
            fontWeight: "bold"
          }}
        />
      </CardContent>
      <CardContent>
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
