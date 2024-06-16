import React, { useState } from "react";
import { Box, Grid, Tabs, Tab, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard/BlogCard";
import Footer from "../components/Footer/Footer";

const pink = "#E61F93";
const yellow = "#FDE12D";

const blogData = [
  {
    id: "1",
    image: "image1.jpg", // Replace with the actual image path
    category: "Categoria1",
    categoryColor: pink,
    title: "Título blog",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
    link: "/blog/1",
    size: "small",
  },
  {
    id: "2",
    image: "image2.jpg", // Replace with the actual image path
    category: "Categoria2",
    categoryColor: yellow,
    title: "Título blog",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
    link: "/blog/2",
    size: "small",
  },
  {
    id: "3",
    image: "image3.jpg", // Replace with the actual image path
    category: "Categoria2",
    categoryColor: yellow,
    title: "Título blog",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
    link: "/blog/3",
    size: "small",
  },
  {
    id: "4",
    image: "image4.jpg", // Replace with the actual image path
    category: "Categoria2",
    categoryColor: yellow,
    title: "Título blog",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
    link: "/blog/4",
    size: "large",
  },
  {
    id: "5",
    image: "image5.jpg", // Replace with the actual image path
    category: "Categoria1",
    categoryColor: pink,
    title: "Título blog",
    description:
      "Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
    link: "/blog/5",
    size: "small",
  },
];

const Blog: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const navigate = useNavigate();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const filteredBlogData =
    selectedTab === "Todo"
      ? blogData
      : blogData.filter((blog) => blog.category === selectedTab);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        paddingBottom: 10, // Responsive padding
        paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
        paddingTop: 5,
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          marginBottom: 7,
          display: "flex",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: pink,
            width: 100,
            height: 100,
            "&:hover": {
              backgroundColor: pink,
              transform: "scale(1.1)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "none",
            },
          }}
          onClick={() => navigate("/")}
        >
          <CloseIcon sx={{ fontSize: 40, color: "white" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          marginBottom: 10,
          display: "flex",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              borderRadius: "16px",
              margin: "0 8px",
              padding: "8px 16px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "black",
              "&.Mui-selected": {
                backgroundColor: pink,
                color: "white",
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label="Todo" value="Todo" />
          <Tab label="Categoria1" value="Categoria1" />
          <Tab label="Categoria2" value="Categoria2" />
          <Tab label="Categoria3" value="Categoria3" />
          <Tab label="Categoria4" value="Categoria4" />
          <Tab label="Categoria5" value="Categoria5" />
        </Tabs>
      </Box>
      <Grid container spacing={4} sx={{marginBottom: 10}}>
        {filteredBlogData.map((blog) => (
          <Grid
            item
            xs={12}
            sm={blog.size === "large" ? 12 : 6}
            md={blog.size === "large" ? 8 : 4}
            key={blog.id}
          >
            <BlogCard
              id={blog.id}
              image={blog.image}
              category={blog.category}
              categoryColor={blog.categoryColor}
              title={blog.title}
              description={blog.description}
              link={blog.link}
            />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
};

export default Blog;
