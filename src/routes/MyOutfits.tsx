import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Avatar,
  IconButton,
  CardActionArea,
  Slide,
  Fade,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";
import placeholder from "../assets/placeholders/place1.jpg";

const pink = "#E61F93";
const lightpink = "#FFD3E2";
const yellow = "#FDE12D";

const userDummyData = {
  name: "Nombre",
  email: "Correo electrónico",
  outfits: [
    {
      id: 1,
      image: placeholder,
      description: "Nombre de outfit",
      favorite: true,
    },
    {
      id: 2,
      image: placeholder,
      description: "Nombre de outfit",
      favorite: true,
    },
    {
      id: 3,
      image: placeholder,
      description: "Nombre de outfit",
      favorite: true,
    },
    // Add more outfits as needed
  ],
};

const MyOutfits: React.FC = () => {
  const navigate = useNavigate();
  const user = userDummyData;

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#fff",
            paddingBottom: 10, // Responsive padding
            paddingRight: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
            paddingLeft: { xs: 2, sm: 4, md: 8, lg: 10, xl: 15 }, // Responsive padding
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
                {user.outfits.map((outfit) => (
                  <Grid item xs={12} sm={6} md={4} key={outfit.id}>
                    <Card
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/catalogo/${outfit.id}`)}
                      >
                        <img
                          src={outfit.image}
                          alt={outfit.description}
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            color: "white",
                            borderRadius: 1,
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "center",
                            width: "calc(100% - 20px)", // Adjust to fit the padding
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "24px",
                            }}
                          >
                            {outfit.description}
                          </Typography>
                          <IconButton
                            sx={{
                              color: "white",
                              borderRadius: "50%",
                              padding: "4px",
                            }}
                          >
                            <ArrowOutwardIcon sx={{ color: "white" }} />
                          </IconButton>
                        </Box>
                        {outfit.favorite && (
                          <StarIcon
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              color: yellow,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </CardActionArea>
                    </Card>
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
