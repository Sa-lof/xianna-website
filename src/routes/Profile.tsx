import React from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const userDummyData = {
  name: "Nombre",
  email: "Correo electrónico",
  styleType: "Tipo estilo del usuario",
  colors: ["#001f3f", "#ffffff", "#808080", "#808000"],
  outfits: [
    {
      id: 1,
      image: "path/to/outfit1.jpg",
      description: "Outfit 1 description",
    },
    {
      id: 2,
      image: "path/to/outfit2.jpg",
      description: "Outfit 2 description",
    },
  ],
  basicItems: [
    {
      id: 1,
      image: "path/to/item1.jpg",
      description: "Prenda 1",
    },
  ],
  tips: [
    "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  ],
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = userDummyData;

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
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
          <Grid container spacing={4}>
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
                  backgroundColor={lightpink}
                  arrowColor={pink}
                  textColor={pink}
                  link="/perfil"
                  text="Mi estilo"
                  sx={{ marginBottom: 2 }}
                />
                <LargeButton
                  backgroundColor="white"
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
              <Card
                sx={{
                  padding: 3,
                  marginBottom: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Tu estilo
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  {user.styleType}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum
                  lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                  Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
                  lorem ipsum Lorem ipsum Lorem ipsum
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {user.colors.map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: color,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Box>
              </Card>
              <Card
                sx={{
                  padding: 3,
                  marginBottom: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Outfits para ti
                </Typography>
                <Grid container spacing={2}>
                  {user.outfits.map((outfit) => (
                    <Grid item xs={6} key={outfit.id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/catalogo/${outfit.id}`)}
                      >
                        <img
                          src={outfit.image}
                          alt={outfit.description}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 8,
                            marginBottom: 2,
                          }}
                        />
                        <Typography variant="body2">
                          {outfit.description}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
              <Card
                sx={{
                  padding: 3,
                  marginBottom: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Prendas básicas
                </Typography>
                <Grid container spacing={2}>
                  {user.basicItems.map((item) => (
                    <Grid item xs={6} key={item.id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 2,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open("https://prenda-website.com", "_blank")
                        }
                      >
                        <img
                          src={item.image}
                          alt={item.description}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 8,
                            marginBottom: 2,
                          }}
                        />
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
              <Card
                sx={{
                  padding: 3,
                  marginBottom: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Consejos de estilo
                </Typography>
                <Grid container spacing={2}>
                  {user.tips.map((tip, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card
                        sx={{
                          padding: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", marginBottom: 1 }}
                        >
                          {`0${index + 1}`}
                        </Typography>
                        <Typography variant="body2">{tip}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Fade>
    </Slide>
  );
};

export default Profile;
