import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import Rating from "../components/Rating/Rating";
import BlogImages from "../components/BlogImages/BlogImages";
import Footer from "../components/Footer/Footer";

const pink = "#E61F93";

const blogData = [
  {
    id: "1",
    title: "Título del Blog",
    description: "Descripción corta",
    category: "Categoría",
    content:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    images: [
      "/path/to/image1.jpg",
      "/path/to/image2.jpg",
      "/path/to/image3.jpg",
      "/path/to/image4.jpg",
      "/path/to/image5.jpg",
    ],
    chipColor: "#E61F93",
  },
  // Add more blog data as needed
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogData.find((b) => b.id === id);
  const navigate = useNavigate();

  if (!blog) {
    return <Typography variant="h6">Blog not found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
        paddingBottom: 10, // Responsive padding
        paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingTop: 5,
      }}
    >
      <IconButton
        onClick={() => navigate("/blog")}
        sx={{
          backgroundColor: pink,
          width: 100,
          height: 100,
          mb: 8,
          "&:hover": {
            backgroundColor: pink,
            transform: "scale(1.1)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "none",
          },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 40, color: "white" }} />
      </IconButton>
      <Grid container spacing={4} sx={{marginBottom: 10}}>
        <Grid item xs={12} md={5}>
          <Header
            title={blog.title}
            description={blog.description}
            category={blog.category}
            chipColor={blog.chipColor}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Content content={blog.content} />
        </Grid>
        <Grid item xs={12}>
          <BlogImages images={blog.images} />
        </Grid>
        <Grid item xs={12}>
          <Rating />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default BlogDetail;
