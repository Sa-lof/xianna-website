import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Avatar,
  IconButton,
  Slide,
  Fade,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";
import CatalogCard from "../components/CatalogCard/CatalogCard";
import { getFavorites, getOutfitsByIds, removeFavorite } from "../supabase/UsersServices/getFavorites";
import supabase from "../supabaseClient";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

interface Outfit {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  favorite: boolean;
}

interface User {
  name: string;
  email: string;
  outfits: Outfit[];
}

const MyOutfits: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    outfits: [],
  });

  useEffect(() => {
    const fetchUserOutfits = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        const userEmail = session.user.email;
        if (!userEmail) {
          console.error("User email is undefined");
          return;
        }
        
        const { data: userDetails, error } = await supabase
          .from('user_details')
          .select('nombre, correo')
          .eq('correo', userEmail)
          .single();

        if (error) {
          console.error('Error fetching user details:', error);
          return;
        }

        const favoriteOutfitIds = await getFavorites(userEmail);
        const favoriteOutfits = await getOutfitsByIds(favoriteOutfitIds);

        setUser({
          name: userDetails.nombre,
          email: userDetails.correo,
          outfits: favoriteOutfits,
        });
      } else {
        console.error('Error fetching session:', error);
      }
    };

    fetchUserOutfits();
  }, []);

  const handleRemoveFavorite = async (outfitId: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const userEmail: string = session.user.email || "";
      const success = await removeFavorite(userEmail, outfitId);
      if (success) {
        setUser((prevState) => ({
          ...prevState,
          outfits: prevState.outfits.filter((outfit) => outfit.id !== outfitId),
        }));
      }
    }
  };

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#fff",
            paddingBottom: 10,
            paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
            paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 },
            paddingTop: 5,
          }}
        >
          <IconButton
            onClick={() => navigate("/perfil")}
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
          <Grid container spacing={4} mb={5}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 3,
                  position: "relative",
                }}
              >
                <Avatar
                  src="path/to/avatar.jpg"
                  alt={user.name}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", marginBottom: 3 }}
                >
                  {user.email}
                </Typography>
                <LargeButton
                  backgroundColor="white"
                  arrowColor={pink}
                  textColor={pink}
                  link="/perfil"
                  text="Mi estilo"
                  sx={{ marginBottom: 2 }}
                />
                <LargeButton
                  backgroundColor={lightpink}
                  arrowColor={pink}
                  textColor={pink}
                  link="/mis-outfits"
                  text="Mis outfits"
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: pink,
                    "&:hover": {
                      backgroundColor: lightpink,
                    },
                  }}
                  onClick={() => navigate("/edit-profile")}
                >
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Mis Outfits
              </Typography>
              <Grid container spacing={2}>
                {user.outfits.map((outfit: Outfit) => (
                  <Grid item xs={12} sm={6} md={4} key={outfit.id}>
                    <Box sx={{ position: "relative" }}>
                      <CatalogCard
                        id={outfit.id.toString()}
                        image={outfit.imagen}
                        title={outfit.nombre}
                        link={`/catalogo/${outfit.id}`}
                      />
                      <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "yellow",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleRemoveFavorite(outfit.id)}
                    >
                      <StarIcon />
                    </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Fade>
    </Slide>
  );
};

export default MyOutfits;
