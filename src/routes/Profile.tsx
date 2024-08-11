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
import Loader from "../components/Loader/Loader";
import supabase from "../supabaseClient";
import { User } from "../supabase/UsersServices/types";
import { fetchUserProfile } from "../supabase/UsersServices/fetchUserProfile";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/"); // Redirigir a la página de inicio de sesión si no hay sesión
        return;
      }
      await fetchUserProfile(setUser);
      console.log(user); // Verifica que los datos sean correctos
      setIsLoading(false); // Set loading to false after data is fetched
    };
  
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  
  

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (updatedUser: User) => {
    const { error } = await supabase
      .from('user_details')
      .update({
        nombre: updatedUser.name,
        ciudad: updatedUser.city,
        sexo: updatedUser.sex,
        edad: updatedUser.age,
        profesion: updatedUser.profession,
        tipo_cuerpo: updatedUser.bodyType,
        talla: updatedUser.size,
        country: updatedUser.country,
      })
      .eq('correo', updatedUser.email);

    if (error) {
      console.error('Error updating user details:', error);
    } else {
      setUser(updatedUser);
      handleModalClose();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      setUser({
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
      navigate("/"); // Navigate to the login page
    }
  };

  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

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
                  sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "25px" }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", marginBottom: 3, fontSize: "15px" }}
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
                <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <LargeButton
        text="Cerrar Sesión"
        link="/logout" // Aquí puedes poner la ruta que desees
        textColor="white"
        arrowColor="white"
        backgroundColor={pink}
        onClick={handleLogout}
        sx={{
          padding: "5px 30px",
          fontSize: "15px",
          minWidth: "200px",
        }}
      />
    </Box>
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
              {user.styleType ? (
                <>
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
                    <Box
                      sx={{
                        display: "flex",
                        overflowX: "auto",
                        padding: 1,
                      }}
                    >
                      {user.outfits.map((outfit) => (
                        <Box
                          key={outfit.id}
                          sx={{
                            minWidth: "200px",
                            marginRight: 2,
                          }}
                        >
                          <CatalogCard
                            id={outfit.id.toString()}
                            image={outfit.imagen}
                            title={outfit.nombre}
                            link={`/catalogo/${outfit.id}`}
                          />
                        </Box>
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
                      Prendas básicas
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        overflowX: "auto",
                        padding: 1,
                      }}
                    >
                      {user.basicItems.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            minWidth: "200px",
                            marginRight: 2,
                          }}
                        >
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              padding: 2,
                              cursor: "pointer",
                              width: "200px",
                              height: "300px",
                              position: "relative",
                              overflow: "hidden",
                            }}
                            onClick={() => window.open(item.link, "_blank")}
                          >
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                zIndex: 2,
                                textAlign: "right",
                                color: "white",
                                fontWeight: "bold",
                                padding: "10px 0",
                                paddingRight: "15%"
                              }}
                            >
                              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "24px" }}>
                                {item.nombre}
                              </Typography>
                            </Box>
                          </Card>
                        </Box>
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
                </>
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h1" sx={{ fontWeight: "bold", mb: 2, fontSize: {
                        xs: '20px', // Tamaño de fuente para pantallas pequeñas
                        sm: '24px', // Tamaño de fuente para pantallas medianas
                        md: '28px', // Tamaño de fuente para pantallas grandes
                        lg: '30px', // Tamaño de fuente para pantallas extra grandes
                      }, }}>
                    ¡Aún no encuentras tu tipo de estilo!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontSize: {
                      xs: '16px', // Tamaño de fuente para pantallas pequeñas
                      sm: '18px', // Tamaño de fuente para pantallas medianas
                      md: '20px', // Tamaño de fuente para pantallas grandes
                      lg: '22px', // Tamaño de fuente para pantallas extra grandes
                    },}}>
                    Responde un cuestionario rápido y descúbrelo.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 4,
                      mb: 4,
                    }}
                  >
                    <LargeButton
                      text="Responder"
                      link="/formulario"
                      textColor="white"
                      arrowColor="white"
                      backgroundColor={pink}
                      onClick={() => navigate("/formulario")}
                    />
                  </Box>
                </Box>
              )}
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
