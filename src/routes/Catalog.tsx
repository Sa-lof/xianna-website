import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Slide,
  Card,
  CardActionArea,
  Typography,
  Pagination,
  Snackbar,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer/Footer";
import getOutfits from '../supabase/CatalogoServices/getOutfits';
import { getStyles, getOccasions } from '../supabase/CatalogoServices/getStylesAndOccasions';
import { getFavorites, addFavorite, removeFavorite } from '../supabase/UsersServices/favoriteService';
import Loader from "../components/Loader/Loader";
import { checkSession} from '../supabase/ProfileServices/checkSession';
import ReactGA from "react-ga"

const pink = "#E61F93";
const yellow = "#FDE12D";

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

const Catalog: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const [selectedEstilos, setSelectedEstilos] = useState<string[]>([]);
  const [selectedOcasiones, setSelectedOcasiones] = useState<string[]>([]);
  const [myOutfits, setMyOutfits] = useState<number[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado para manejar el loader
  const [currentPage, setCurrentPage] = useState(1); // Para controlar la paginación
  const itemsPerPage = 16; // Mostrar 16 outfits por página
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOutfitClick = (outfitId: number, outfitName: string) => {
    ReactGA.event({
      category: "User",
      action: `Clicked on outfit with ID: ${outfitId}`,
      label: outfitName,
    });
    navigate(`/catalogo/${outfitId}`);  // Navega a la página del outfit
  };
  

  const { ref: filterRef, inView: filterInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: catalogRef, inView: catalogInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedOutfits = await getOutfits();
      setOutfits(fetchedOutfits);
    
      const fetchedStyles = await getStyles();
      setStyles(fetchedStyles.map(style => style.tipo));
    
      const fetchedOccasions = await getOccasions();
      setOccasions(fetchedOccasions.map(occasion => occasion.ocasion));
    
      try {
        const session = await checkSession(); // Uso del servicio
        setSession(session);
    
        if (session) {
          const user = session.user;
          if (user.email) {
            const favoritos = await getFavorites(user.email);
            setMyOutfits(favoritos);
          } else {
            console.error('User email is undefined');
          }
        }
      } catch (error) {
        console.error('Error fetching session', error);
      }
    
      setLoading(false); // Una vez que los datos se hayan cargado, se oculta el loader
    };    

    fetchData();
  }, []);

  const handleButtonClick = () => {
    setSelectedTab("Todo");
    setSelectedEstilos([]);
    setSelectedOcasiones([]);
  };

  const handleEstiloChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedEstilos(event.target.value as string[]);
  };

  const handleOcasionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedOcasiones(event.target.value as string[]);
  };

  const handleToggleOutfit = async (id: number, nombre: string) => {
    if (!session) {
      alert('You must be logged in to save favorites');
      return;
    }

    const user = session.user;
    if (!user.email) {
      console.error('User email is undefined');
      return;
    }

    const isFavorite = myOutfits.includes(id);

    if (isFavorite) {
      const success = await removeFavorite(user.email, id);
      if (success) {
        setMyOutfits((prevOutfits) => prevOutfits.filter((outfitId) => outfitId !== id));
        ReactGA.event({
          category: "User",
          action: `Removed outfit from favorites`,
          label: nombre,
        });
      }
    } else {
      const success = await addFavorite(user.email, id);
      if (success) {
        setMyOutfits((prevOutfits) => [...prevOutfits, id]);
        ReactGA.event({
          category: "User",
          action: `Added outfit to favorites`,
          label: nombre,
        });
      }
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page); // Cambiar la página actual
  };

  // Filtrar los outfits por estilo y ocasión seleccionados
  const filteredCatalogData = outfits.filter((item) => {
    const estiloMatch = selectedEstilos.length === 0 || selectedEstilos.includes(item.estilo);
    const ocasionMatch = selectedOcasiones.length === 0 || item.ocasiones.some(ocasion => selectedOcasiones.includes(ocasion));
    return estiloMatch && ocasionMatch;
  });

  // Obtener los outfits para la página actual
  const paginatedOutfits = filteredCatalogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!loading && session) {
      setSnackbarMessage('Haz clic en la estrella para guardar tus outfits favoritos'); // Configurar el mensaje del Snackbar
      setOpenSnackbar(true); // Mostrar el Snackbar una vez que el loader desaparezca y el usuario esté logueado
    }
  }, [loading, session]);
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  if (loading) {
    return <Loader />; // Mostrar el loader mientras está cargando
  }

  return (
    <>
    <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
    {snackbarMessage}
  </Alert>
</Snackbar>
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
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
        <Box
          sx={{
            justifyContent: "center",
            marginBottom: 10,
            display: "flex",
            gap: 2,
            flexWrap: 'wrap',
            alignItems: "center",
          }}
          ref={filterRef}
        >
          {filterInView && (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  borderRadius: "16px",
                  margin: "0 8px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: selectedTab === "Todo" ? "white" : "black",
                  backgroundColor:
                    selectedTab === "Todo" ? pink : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedTab === "Todo" ? pink : "lightgray",
                  },
                }}
                onClick={handleButtonClick}
              >
                Todo
              </Button>
              <FormControl sx={{ minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel shrink={selectedEstilos.length > 0}>
                {selectedEstilos.length === 0 ? "Estilo" : ""}
              </InputLabel>
                <Select
                  multiple
                  value={selectedEstilos}
                  onChange={handleEstiloChange}
                  renderValue={(selected) => selected.length ? `${selected.length} seleccionado(s)` : "Ninguno"}
                  sx={{
                    borderRadius: "16px",
                    "& .MuiSelect-select": {
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                  }}
                >
                  {styles.map((estilo) => (
                    <MenuItem key={estilo} value={estilo}>
                    <Checkbox
                      checked={selectedEstilos.indexOf(estilo) > -1}
                      sx={{
                        color: pink, 
                        '&.Mui-checked': {
                          color: pink, 
                        },
                        '& .MuiSvgIcon-root': {
                          borderRadius: '50%',
                        },
                      }}
                    />
                    <ListItemText primary={estilo} />
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel shrink={selectedOcasiones.length > 0}>
                {selectedOcasiones.length === 0 ? "Ocasión" : ""}
              </InputLabel>
                <Select
                  multiple
                  value={selectedOcasiones}
                  onChange={handleOcasionChange}
                  renderValue={(selected) => selected.length ? `${selected.length} seleccionado(s)` : "Ninguno"}
                  sx={{
                    borderRadius: "16px",
                    "& .MuiSelect-select": {
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                  }}
                >
                  {occasions.map((ocasion) => (
                    <MenuItem key={ocasion} value={ocasion}>
                    <Checkbox
                      checked={selectedOcasiones.indexOf(ocasion) > -1}
                      sx={{
                        color: pink, 
                        '&.Mui-checked': {
                          color: pink, 
                        },
                        '& .MuiSvgIcon-root': {
                          borderRadius: '50%',
                        },
                      }}
                    />
                    <ListItemText primary={ocasion} />
                  </MenuItem>                  
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>
        <Grid container spacing={4} sx={{ marginBottom: 10 }} ref={catalogRef}>
          {catalogInView &&
            paginatedOutfits.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: '100%',
                  }}
                >
                  <CardActionArea 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onClick={() => handleOutfitClick(item.id, item.nombre)}
                  >
                    <Box 
                      sx={{
                        width: "100%",
                        height: 0,
                        paddingTop: "75%",
                        position: "relative",
                      }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
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
                        width: "calc(100% - 20px)",
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
                        {item.nombre}
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
                  </CardActionArea>
                  {session && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: myOutfits.includes(item.id) ? yellow : "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleToggleOutfit(item.id, item.nombre)} 
                    >
                      <StarIcon />
                    </IconButton>
                  )}
                </Card>
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={Math.ceil(filteredCatalogData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 5,
            "& .MuiPaginationItem-root": {
              backgroundColor: 'white', // Fondo rosa
              color: "black", // Texto blanco
              "&.Mui-selected": {
                backgroundColor: pink, // Fondo rosa cuando está seleccionado
                color: "white", // Texto blanco cuando está seleccionado
              },
              "&:hover": {
                backgroundColor: "black", // Fondo más oscuro al pasar el mouse
                color: "white",
              },
            },
          }}
        />
        <Box ref={footerRef}>{footerInView && <Footer />}</Box>
      </Box>
    </Slide>
    </>
  );
};

export default Catalog;
