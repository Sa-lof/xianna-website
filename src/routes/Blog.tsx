import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BlogCard from "../components/BlogCard/BlogCard";
import Footer from "../components/Footer/Footer";
import getBlogs from "../supabase/BlogServices/getBlogs";
import getCategorias from "../supabase/BlogServices/getCategorias";
import Loader from "../components/Loader/Loader";

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

interface Categoria {
  id: number;
  categoria: string;
}

const BlogComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const [blogs, setBlogs] = useState<BlogWithExtras[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogsAndCategorias = async () => {
      try {
        const [blogsData, categoriasData] = await Promise.all([getBlogs(), getCategorias()]);
        let sizeCounter = 0;
        const blogsWithExtras = blogsData.map(blog => {
          const size = sizeCounter % 5 === 3 ? 'large' : 'small';
          sizeCounter++;
          const categoryColor = Math.random() > 0.5 ? pink : yellow;
          return {
            ...blog,
            size: size,
            link: `/blog/${blog.id}`,
            categoryColor: categoryColor,
          };
        });
        setBlogs(blogsWithExtras);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error fetching blogs or categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogsAndCategorias();
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingBottom: 10,
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
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
              {categorias.map((categoria) => (
                <Tab
                  key={categoria.id}
                  label={categoria.categoria}
                  value={categoria.categoria}
                />
              ))}
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
                  id={blog.id.toString()}
                  image={blog.image}
                  category={blog.category}
                  categoryColor={blog.categoryColor}
                  title={blog.titulo}
                  description={blog.descripcion}
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
