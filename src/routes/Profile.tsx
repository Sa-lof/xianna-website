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
import { User } from "../supabase/UsersServices/types";
import { checkUserSession } from "../supabase/ProfileServices/checkUserSession";
import { updateUserProfile } from "../supabase/ProfileServices/updateUserService";
import { logoutUser } from "../supabase/ProfileServices/logoutService";
import x from "../assets/logo/x.png";
import { Helmet } from "react-helmet";

const pink = "#E61F93";
const lightpink = "#FFD3E2";

const styleTips: Record<string, string[]> = {
  "Casual": [
    "Usa jeans de corte recto con camisas de botones o blazers.",
    "Opta por zapatos cómodos como mocasines o zapatillas elegantes.",
    "Añade un reloj clásico o bufandas para elevar el look."
  ],
  "Formal": [
    "Opta por prendas de corte estructurado, como blazers y abrigos.",
    "Elige accesorios minimalistas, como perlas o relojes clásicos.",
    "Mantén una paleta de colores neutros y suaves para un look elegante."
  ],
  "Deportivo": [
    "Elige prendas transpirables para mayor comodidad.",
    "Combina tus prendas con calzado adecuado para el deporte.",
    "Usa capas ligeras que puedas quitarte o ponerte fácilmente."
  ],
  "Elegante": [
    "Los colores oscuros y ricos son perfectos para eventos formales.",
    "Elige tejidos de calidad como seda o lana.",
    "Usa joyas simples pero sofisticadas para complementar tu look."
  ],
  "Bohemio": [
    "Elige vestidos largos y fluidos con estampados florales o terrosos.",
    "Combina con botas camperas y sombreros de ala ancha.",
    "Utiliza accesorios de materiales naturales, como collares de piedras o tejidos."
  ],
  "Urbano": [
    "Incorpora prendas coloridas y de diseño llamativo, como tops cortos y botas extravagantes.",
    "No temas mezclar patrones y texturas para un efecto audaz.",
    "Utiliza accesorios divertidos, como gafas de sol grandes o joyería única."
  ],
  "Romántico": [
    "Opta por vestidos con volantes y estampados florales.",
    "Agrega accesorios como diademas o joyería delicada para un toque encantador.",
    "Elige un maquillaje suave con tonos pastel y un look natural."
  ],
  "Rebelde": [
    "Combina prendas de cuero con palyeras de bandas y jeans rasgados.",
    "Incorpora accesorios llamativos, como gargantillas o anillos de plata.",
    "Opta por un maquillaje intenso con delineado negro y labios oscuros."
  ],
  "Cómodo": [
    "Opta por chándales, leggings y sudaderas oversize.",
    "Combina con calzado deportivo para un toque casual.",
    "Añade accesorios prácticos, como mochilas y gorras."
  ],
  "Futurista": [
    "Incorpora prendas con detalles metálicos y siluetas innovadoras.",
    "Utiliza accesorios futuristas, como gafas de sol de diseño y collares geométricos.",
    "Juega con el maquillaje metálico o gráfico para complementar el look."
  ],
  "Llamativo": [
    "Elige vestidos ajustados y tacones altos para un impacto visual.",
    "Agrega joyería llamativa y de diseñador para un toque de lujo.",
    "Opta por un maquillaje audaz con sombras brillantes y labios rojos."
  ],
  "Versátil": [
    "Opta por blusas de seda y pantalones de vestir en tonos neutros.",
    "Elige zapatos de salón minimalistas o mocasines elegantes.",
    "Mantén la joyería discreta y moderna."
  ],
  "Retro": [
    "Incorpora piezas vintage, como chalecos o cárdigans, en tus looks.",
    "Mezcla y combina objetos decorativos retro para un toque auténtico.",
    "Juega con la moda de décadas pasadas, como vestidos de los 50 o 60."
  ]
};

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
    checkUserSession(navigate, setUser, setIsLoading);
  }, [navigate]);
  

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (updatedUser: User) => {
    try {
      await updateUserProfile(updatedUser);
      setUser(updatedUser);
      handleModalClose();
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
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
      navigate("/");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const styleBasedTips = styleTips[user.styleType] || ["Define tu estilo para recibir consejos personalizados."];

  return (
    <>
      <Helmet>
        <title>Xianna | Perfil</title>
        <meta name="description" content="Gestiona tu perfil en Xianna. Personaliza tus preferencias de estilo, explora tus outfits guardados y recibe consejos personalizados de moda según tu estilo único." />
        <meta name="keywords" content="Xianna, perfil de usuario, moda, estilo, outfits, guardarropa, personalizar perfil, consejos de moda, looks personalizados, guardar outfits" />
        
        <meta property="og:title" content="Xianna | Perfil" />
        <meta property="og:description" content="Explora y personaliza tu perfil en Xianna. Descubre tus outfits guardados y obtén consejos de estilo personalizados." />
        <meta property="og:image" content={x} />
        <meta property="og:url" content="https://xianna.com.mx/perfil" />
        <meta property="og:type" content="website" />
      </Helmet>
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
                    src={x}
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
          link="/logout"
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
      {styleBasedTips.slice(0, 3).map((tip, index) => {
        // Definir el color de fondo según el índice
        const backgroundColor =
          index === 0
            ? "#FAACC1" // Primer consejo
            : index === 1
            ? "#FDE12D" // Segundo consejo
            : "#00D1ED"; // Tercer consejo

        return (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: backgroundColor, // Aplicar el color de fondo
                color: "white", // Color del texto (puedes cambiar si es necesario)
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                {`Consejo ${index + 1}`}
              </Typography>
              <Typography variant="body2">{tip}</Typography>
            </Card>
          </Grid>
        );
      })}
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
                          xs: '20px', 
                          sm: '24px',
                          md: '28px',
                          lg: '30px',
                        }, }}>
                      ¡Aún no encuentras tu tipo de estilo!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: {
                        xs: '16px', 
                        sm: '18px', 
                        md: '20px', 
                        lg: '22px', 
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
    </>
  );
};

export default Profile;
