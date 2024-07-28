import React, { useState, useEffect } from "react";
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
import EditProfileModal from "../components/EditProfileModal/EditProfileModal";
import CatalogCard from "../components/CatalogCard/CatalogCard";
import { fetchUserProfile } from "../supabase/UsersServices/fetchUserProfile";
import { updateUserProfile } from "../supabase/UsersServices/updateUserProfile";
import { User, Outfit, Prenda } from "../supabase/UsersServices/types";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    city: "",
    sex: "",
    age: 0,
    profession: "",
    bodyType: "",
    size: "",
    country: "",
    styleType: "",
    styleDescription: "",
    colors: [],
    outfits: [],
    basicItems: [],
    tips: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUserProfile(setUser);
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (updatedUser: User) => {
    const { data, error } = await updateUserProfile(updatedUser);
    if (error) {
      console.error('Error updating user details:', error);
    } else {
      setUser(updatedUser);
      handleModalClose();
    }
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
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
                  onClick={handleModalOpen}
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
                  {user.styleDescription}
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
                      <CatalogCard
                        id={outfit.id.toString()}
                        image={outfit.imagen}
                        title={outfit.nombre}
                        link={`/catalogo/${outfit.id}`}
                      />
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
                        onClick={() => window.open(item.link, "_blank")}
                      >
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 8,
                            marginBottom: 2,
                          }}
                        />
                        <Typography variant="body2">{item.nombre}</Typography>
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
          <EditProfileModal
            open={isModalOpen}
            handleClose={handleModalClose}
            user={user}
            handleSave={handleSave}
          />
        </Box>
      </Fade>
    </Slide>
  );
};

export default Profile;
