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
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LargeButton from "../components/LargeButton/LargeButton";
import CatalogCard from "../components/CatalogCard/CatalogCard";
import EditProfileModal from "../components/EditProfileModal/EditProfileModal";
import { getFavorites, getOutfitsByIds, removeFavorite } from "../supabase/UsersServices/getFavorites";
import { getUserSession } from "../supabase/ProfileServices/getUserSession";
import { getUserDetails } from "../supabase/ProfileServices/getUserDetails";
import Loader from "../components/Loader/Loader";
import x from "../assets/logo/x.png";

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
  city: string;
  sex: string;
  age: number;
  profession: string;
  bodyType: string;
  size: string;
  country: string;
  outfits: Outfit[];
}

const MyOutfits: React.FC = () => {
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
    outfits: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchUserOutfits = async () => {
      try {
        const session = await getUserSession();
        const userEmail = session.user.email;
  
        if (!userEmail) {
          throw new Error("User email is undefined");
        }
  
        const userDetails = await getUserDetails(userEmail);
        const favoriteOutfitIds = await getFavorites(userEmail);
        const favoriteOutfits = await getOutfitsByIds(favoriteOutfitIds);
  
        setUser({
          name: userDetails.nombre,
          email: userDetails.correo,
          city: userDetails.ciudad,
          sex: userDetails.sexo,
          age: userDetails.edad,
          profession: userDetails.profesion,
          bodyType: userDetails.tipo_cuerpo,
          size: userDetails.talla,
          country: userDetails.country,
          outfits: favoriteOutfits,
        });
  
        setIsLoading(false);
      } catch (error) {
        console.error((error as Error).message);
        setIsLoading(false);
      }
    };
  
    fetchUserOutfits();
  }, []);
  

  const handleRemoveFavorite = async (outfitId: number) => {
    try {
      const session = await getUserSession();
      const userEmail = session.user.email;
  
      if (!userEmail) {
        throw new Error("User email is undefined");
      }
  
      await removeFavorite(userEmail, outfitId);
  
      setUser((prevState) => ({
        ...prevState,
        outfits: prevState.outfits.filter((outfit) => outfit.id !== outfitId),
      }));
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (updatedUser: User) => {
    try {
      await getUserDetails(updatedUser.email);
      setUser(updatedUser);
      handleModalClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <Loader />;
  }

  const paginatedOutfits = user.outfits.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                  src={x}
                  alt={user.name}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 1,
                    fontSize: "25px",
                  }}
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
                  onClick={handleModalOpen}
                >
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              {user.outfits.length === 0 ? (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      fontSize: {
                        xs: "20px", 
                        sm: "24px", 
                        md: "28px", 
                        lg: "30px", 
                      },
                    }}
                  >
                    ¡Aún no tienes outfits favoritos!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontSize: {
                        xs: "16px", 
                        sm: "18px",
                        md: "20px",
                        lg: "22px",
                      },
                    }}
                  >
                    Navega en nuestro catálogo y guarda los que más te gusten
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
                      text="Ver catálogo"
                      link="/catalogo"
                      textColor="white"
                      arrowColor="white"
                      backgroundColor={pink}
                      onClick={() => navigate("/catalogo")}
                    />
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: 2 }}
                  >
                    Mis Outfits
                  </Typography>
                  <Grid container spacing={2}>
                    {paginatedOutfits.map((outfit: Outfit) => (
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
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                      count={Math.ceil(user.outfits.length / itemsPerPage)}
                      page={page}
                      onChange={handleChangePage}
                      renderItem={(item) => (
                        <PaginationItem
                          {...item}
                          sx={{
                            "&.Mui-selected": {
                              backgroundColor: pink,
                              color: "white",
                            },
                            "& .MuiPaginationItem-root": {
                              color: pink,
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </>
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

export default MyOutfits;
