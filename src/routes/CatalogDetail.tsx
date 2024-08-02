import React, { useState, useEffect } from "react";
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
import getOutfits from '../supabase/CatalogoServices/getOutfits';
import { getPrendasByOutfitId } from '../supabase/CatalogoServices/getPrendasByOutfitId';
import Loader from "../components/Loader/Loader";

interface Outfit {
  id: number;
  nombre: string;
  descripcion: string;
  id_estilo: number;
  estilo: string;
  imagen: string;
  ocasiones: string[];
  favoritos: number;
}

interface Prenda {
  id: number;
  nombre: string;
  link: string;
  imagen: string;
  id_outfit: number;
}

const CatalogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [catalog, setCatalog] = useState<Outfit | null>(null);
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [loading, setLoading] = useState(true); // Estado para manejar el loader
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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedOutfits = await getOutfits();
        const outfit = fetchedOutfits.find((o) => o.id === parseInt(id));
        if (outfit) {
          setCatalog(outfit);
          const fetchedPrendas = await getPrendasByOutfitId(outfit.id);
          setPrendas(fetchedPrendas);
        }
      }
      setLoading(false); // Una vez que los datos se hayan cargado, se oculta el loader
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

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
          title={catalog.nombre}
          category={catalog.estilo}
          chipColor={yellow}
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
                <Description description={catalog.descripcion} />
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
                  sx={{ fontSize: {
                    xs: '24px', 
                    sm: '28px',
                    md: '32px',
                    lg: '40px',
                  }, fontWeight: "bold" }}
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
                  link="/formulario"
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={mainImageInView} timeout={2000}>
              <div ref={mainImageRef}>
                <MainImage imageUrl={catalog.imagen} />
              </div>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade in={clothesInView} timeout={2000}>
              <div ref={clothesRef}>
                <Clothes items={prendas.map(prenda => ({
                  image: prenda.imagen,
                  title: prenda.nombre,
                  link: prenda.link
                }))} />
              </div>
            </Fade>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: 10 }}>
          <Grid item xs={12} md={9}>
            <Fade in={occasionsInView} timeout={2000}>
              <div ref={occasionsRef}>
                <Occasions occasions={catalog.ocasiones} />
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
