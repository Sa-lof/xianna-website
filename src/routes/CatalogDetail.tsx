import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Slide,
  Fade,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CatalogTitle from "../components/CatalogTitle/CatalogTitle";
import Description from "../components/Description/Description";
import MainImage from "../components/MainImage/MainImage";
import Clothes from "../components/Clothes/Clothes";
import Occasions from "../components/Occasion/Occasion";
import Footer from "../components/Footer/Footer";
import SmallButton from "../components/SmallButton/SmallButton";
import placeholder from "../assets/placeholders/place1.jpg";

const catalogData = [
  {
    id: "1",
    title: "Nombre del outfit",
    description:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    mainImage: placeholder,
    styleButtonLink: "/style-questionnaire",
    occasions: ["Ocasión 1", "Ocasión 2", "Ocasión 3", "Ocasión 4"],
    items: [
      { image: "/path/to/item1.jpg", title: "Prenda 1", link: "/item1" },
      { image: "/path/to/item2.jpg", title: "Prenda 2", link: "/item2" },
      { image: "/path/to/item3.jpg", title: "Prenda 3", link: "/item3" },
    ],
    category: "Tipo estilo 1",
    chipColor: "#00CFFF",
  },
  {
    id: "2",
    title: "Otro outfit",
    description:
      "Otro Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    mainImage: "/path/to/mainimage2.jpg",
    styleButtonLink: "/style-questionnaire-2",
    occasions: ["Ocasión A", "Ocasión B", "Ocasión C", "Ocasión D"],
    items: [
      { image: "/path/to/item4.jpg", title: "Prenda 4", link: "/item4" },
      { image: "/path/to/item5.jpg", title: "Prenda 5", link: "/item5" },
      { image: "/path/to/item6.jpg", title: "Prenda 6", link: "/item6" },
    ],
    category: "Tipo estilo 2",
    chipColor: "#FF5733",
  },
  // Add more catalog data as needed
];

const CatalogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const catalog = catalogData.find((c) => c.id === id);
  const navigate = useNavigate();
  const pink = "#E61F93";
  const yellow = "#FDE12D";

  const { ref: descriptionRef, inView: descriptionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: mainImageRef, inView: mainImageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: clothesRef, inView: clothesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: occasionsRef, inView: occasionsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!catalog) {
    return <Typography variant="h6">Catalog not found</Typography>;
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
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingBottom: 10,
          paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
          paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
          paddingTop: 5,
        }}
      >
        <IconButton
          onClick={() => navigate("/catalogo")}
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
        <CatalogTitle
          title={catalog.title}
          category={catalog.category}
          chipColor={catalog.chipColor}
        />
        <Grid container spacing={4} sx={{ marginBottom: 3 }}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Fade in={descriptionInView} timeout={2000}>
              <div ref={descriptionRef}>
                <Description description={catalog.description} />
              </div>
            </Fade>
            <Card
              sx={{
                color: "white",
                backgroundColor: yellow,
                padding: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                marginTop: 4,
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontSize: "40px", fontWeight: "bold" }}
                >
                  Cuestionario de Estilo
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SmallButton
                  backgroundColor="white"
                  arrowColor="black"
                  link={catalog.styleButtonLink}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={mainImageInView} timeout={2000}>
              <div ref={mainImageRef}>
                <MainImage imageUrl={catalog.mainImage} />
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade in={clothesInView} timeout={2000}>
              <div ref={clothesRef}>
                <Clothes items={catalog.items} />
              </div>
            </Fade>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: 10 }}>
          <Grid item xs={12} md={9}>
            <Fade in={occasionsInView} timeout={2000}>
              <div ref={occasionsRef}>
                <Occasions occasions={catalog.occasions} />
              </div>
            </Fade>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Ocasiones de uso
            </Typography>
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

export default CatalogDetail;
