import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BlogCard from "../components/BlogCard/BlogCard";
import Footer from "../components/Footer/Footer";
import getBlogs from "../supabase/BlogServices/getBlogs";

const pink = "#E61F93";
const yellow = "#FDE12D";

interface BlogData {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  categoria: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  persons: number;
  images: string[];
}

interface BlogWithExtras extends BlogData {
  size: string;
  link: string;
  categoryColor: string;
}

const BlogComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const [blogs, setBlogs] = useState<BlogWithExtras[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getBlogs();
      let sizeCounter = 0; // Contador para el patrón de tamaño
      const blogsWithExtras = blogsData.map(blog => {
        const size = sizeCounter % 5 === 3 ? 'large' : 'small'; // Aplicar patrón de tamaño
        sizeCounter++;
        const categoryColor = Math.random() > 0.5 ? pink : yellow; // Asignar color aleatorio
        return {
          ...blog,
          size: size,
          link: `/blog/${blog.id}`,
          categoryColor: categoryColor,
        };
      });
      setBlogs(blogsWithExtras);
    };
    fetchBlogs();
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const { ref: filterRef, inView: filterInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: blogRef, inView: blogInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const filteredBlogData =
    selectedTab === "Todo"
      ? blogs
      : blogs.filter((blog) => blog.categoria === selectedTab);

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
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
          ref={filterRef}
        >
          {filterInView && (
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
          )}
        </Box>
        <Grid container spacing={4} sx={{ marginBottom: 10 }} ref={blogRef}>
          {blogInView &&
            filteredBlogData.map((blog) => (
              <Grid
                item
                xs={12}
                sm={blog.size === "large" ? 12 : 6}
                md={blog.size === "large" ? 8 : 4}
                key={blog.id}
              >
                <BlogCard
                  id={blog.id.toString()} // Convert id to string if necessary
                  image={blog.image}
                  category={blog.category}
                  categoryColor={blog.categoryColor}
                  title={blog.titulo} // Adjust field names
                  description={blog.descripcion} // Adjust field names
                  link={blog.link}
                />
              </Grid>
            ))}
        </Grid>
        <Box ref={footerRef}>{footerInView && <Footer />}</Box>
      </Box>
    </Slide>
  );
};

export default BlogComponent;
