import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Slide, Fade, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import BlogImages from "../components/BlogImages/BlogImages";
import Footer from "../components/Footer/Footer";
import Rating from "../components/Rating/Rating";
import LargeButton from "../components/LargeButton/LargeButton";
import { fetchBlog, fetchUserEmail, fetchRating, submitRating } from "../supabase/BlogServices/BlogService";
import Loader from "../components/Loader/Loader";

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
  const [rating, setRating] = useState<number | null>(null);
  const [existingRating, setExistingRating] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showReRateMessage, setShowReRateMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Estados para manejar la Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const blogData = await fetchBlog(Number(id));
      setBlog(blogData);

      const email = await fetchUserEmail();
      setUserEmail(email);

      const userRating = await fetchRating(Number(id), email);
      if (userRating !== null) {
        setExistingRating(userRating);
        setRating(userRating);
        setShowReRateMessage(true);
      }

      setLoading(false); 
    };

    initialize();
  }, [id]);

  const handleRatingSubmit = async (newRating: number) => {
    try {
      await submitRating(Number(id), newRating, userEmail, existingRating);
      setSnackbarMessage('¡Calificación enviada exitosamente!');
      setOpenSnackbar(true);

      // Actualizar inmediatamente el estado para reflejar que se ha calificado
      setRating(newRating);
      setExistingRating(newRating);
      setShowReRateMessage(true); // Cambia el mensaje a "Ya has calificado este blog"
    } catch (error) {
      setSnackbarMessage('Error al enviar la calificación.');
      setOpenSnackbar(true);
      console.error(error);
    }
  };

  const handleReRate = () => {
    setShowReRateMessage(false);
  };

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return <Typography variant="h6">Blog not found</Typography>;
  }

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingBottom: 10,
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
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
                  chipColor={pink}
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
              <div
                ref={ratingRef}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                {showReRateMessage ? (
                  <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Ya has calificado este blog
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginY: 2 }}>
                      ¿Quieres volverlo a calificar?
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                      <LargeButton
                        backgroundColor={pink}
                        arrowColor="white"
                        link="#"
                        text="Calificar"
                        textColor="white"
                        onClick={handleReRate}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Rating initialRating={rating || 0} onSubmit={handleRatingSubmit} />
                )}
              </div>
            </Fade>
          </Grid>
        </Grid>
        <Fade in={footerInView} timeout={2000}>
          <div ref={footerRef}>
            <Footer />
          </div>
        </Fade>

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Slide>
  );
};

export default BlogDetail;
