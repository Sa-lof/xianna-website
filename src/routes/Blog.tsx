import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab, IconButton, Slide, Pagination,Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BlogCard from "../components/BlogCard/BlogCard";
import Footer from "../components/Footer/Footer";
import getBlogs from "../supabase/BlogServices/getBlogs";
import getCategorias from "../supabase/BlogServices/getCategorias";
import Loader from "../components/Loader/Loader";
import { Helmet } from "react-helmet";
import x from "../assets/logo/x.png";

const pink = "#E61F93";
const yellow = "#FDE12D";
const blue = "#00D1ED";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Mostrar 8 elementos por página
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchBlogsAndCategorias = async () => {
      try {
        const [blogsData, categoriasData] = await Promise.all([getBlogs(), getCategorias()]);
        let sizeCounter = 0;
        const blogsWithExtras = blogsData.map((blog) => {
          const size = sizeCounter % 5 === 3 ? "large" : "small";
          sizeCounter++;
          const colors = [pink, blue, yellow];
          const categoryColor = colors[Math.floor(Math.random() * colors.length)];
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
    setCurrentPage(1); // Resetear a la primera página al cambiar la categoría
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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

  // Filtrar los blogs de acuerdo a la categoría seleccionada
  const filteredBlogData =
    selectedTab === "Todo"
      ? blogs
      : blogs.filter((blog) => blog.categoria === selectedTab);

  // Obtener los blogs para la página actual
  const paginatedBlogs = filteredBlogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!loading) {
      setSnackbarMessage('Entra a tu blog favorito y califícalo'); // Configurar el mensaje del Snackbar
      setOpenSnackbar(true); // Mostrar el Snackbar una vez que el loader desaparezca
    }
  }, [loading]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loader />; // Mostrar el loader mientras está cargando
  }

  return (
    <>
    <Helmet>
      <title>Xianna | Blog</title>
      <meta name="description" content="Mantente al día con nuestras publicaciones sobre moda, tecnología, estilo de vida y más. Descubre artículos, noticias y categorías para todos los gustos." />
      <meta name="keywords" content="blog, tecnología, estilo de vida, moda, noticias, belleza, artículos, novedades, tendencias, últimas publicaciones" />
      
      <meta property="og:title" content="Xianna | Blog" />
      <meta property="og:description" content="Explora nuestro blog con artículos sobre tendencias en moda, tecnología y estilo de vida. Mantente informado con nuestras últimas publicaciones." />
      <meta property="og:image" content={x} />
      <meta property="og:url" content="https://xianna.com.mx/blog" />
      <meta property="og:type" content="website" />
    </Helmet>
    <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

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
            paginatedBlogs.map((blog) => (
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
        <Pagination
          count={Math.ceil(filteredBlogData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 5,
            "& .MuiPaginationItem-root": {
              backgroundColor: 'white', // Fondo rosa
              color: "black", // Texto blanco
              "&.Mui-selected": {
                backgroundColor: pink, // Fondo rosa cuando está seleccionado
                color: "white", // Texto blanco cuando está seleccionado
              },
              "&:hover": {
                backgroundColor: "black", // Fondo más oscuro al pasar el mouse
                color: "white",
              },
            },
          }}
        />
        <Box ref={footerRef}>{footerInView && <Footer />}</Box>
      </Box>
    </Slide>
    </>
  );
};

export default BlogComponent;
