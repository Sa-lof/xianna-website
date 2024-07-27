import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Slide, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import Rating from "../components/Rating/Rating";
import BlogImages from "../components/BlogImages/BlogImages";
import Footer from "../components/Footer/Footer";
import getBlogs from "../supabase/BlogServices/getBlogs";
import getBlogImages from "../supabase/BlogServices/getBlogImages";

const pink = "#E61F93";
interface Blog {
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
const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await getBlogs();
      const selectedBlog = blogs.find((b) => b.id === Number(id));
      if (selectedBlog) {
        const images = await getBlogImages(selectedBlog.id);
        setBlog({ ...selectedBlog, images });
      }
    };
    fetchBlog();
  }, [id]);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: imagesRef, inView: imagesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: ratingRef, inView: ratingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!blog) {
    return <Typography variant="h6">Blog not found</Typography>;
  }

  return (
    <Slide
      direction="right"
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={800}
    >
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
        <Grid container spacing={4} sx={{ marginBottom: 10 }}>
          <Grid item xs={12} md={5}>
            <Fade in={headerInView} timeout={2000}>
              <div ref={headerRef}>
                <Header
                  title={blog.titulo}
                  description={blog.descripcion}
                  category={blog.categoria}
                  chipColor={pink} // Cambiar el color si es necesario
                />
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12} md={7}>
            <Fade in={contentInView} timeout={2000}>
              <div ref={contentRef}>
                <Content content={blog.contenido} />
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Fade in={imagesInView} timeout={2000}>
              <div ref={imagesRef}>
                <BlogImages images={blog.images} />
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Fade in={ratingInView} timeout={2000}>
              <div ref={ratingRef}>
                <Rating />
              </div>
            </Fade>
          </Grid>
        </Grid>
        <Fade in={footerInView} timeout={2000}>
          <div ref={footerRef}>
            <Footer />
          </div>
        </Fade>
      </Box>
    </Slide>
  );
};

export default BlogDetail;
