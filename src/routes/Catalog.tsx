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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer/Footer";
import placeholder from "../assets/placeholders/place1.jpg";
import getOutfits from '../supabase/CatalogoServices/getOutfits';
import { getStyles, getOccasions } from '../supabase/CatalogoServices/getStylesAndOccasions';

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
  const [selectedCuerpos, setSelectedCuerpos] = useState<string[]>([]);
  const [myOutfits, setMyOutfits] = useState<string[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const navigate = useNavigate();

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
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    setSelectedTab("Todo");
    window.location.reload();
  };

  const handleEstiloChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedEstilos(event.target.value as string[]);
  };

  const handleOcasionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedOcasiones(event.target.value as string[]);
  };

  const handleCuerpoChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCuerpos(event.target.value as string[]);
  };

  const handleToggleOutfit = (id: number) => {
    setMyOutfits((prevOutfits) =>
      prevOutfits.includes(id.toString())
        ? prevOutfits.filter((outfitId) => outfitId !== id.toString())
        : [...prevOutfits, id.toString()]
    );
  };

  const filteredCatalogData = outfits.filter((item) => {
    const estiloMatch =
      selectedEstilos.length === 0 || selectedEstilos.includes(item.estilo);
    const ocasionMatch =
      selectedOcasiones.length === 0 || 
      item.ocasiones.some(ocasion => selectedOcasiones.includes(ocasion));
    // Ajustar según la lógica para cuerpos, si es necesario
    return estiloMatch && ocasionMatch;
  });

  return (
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
            alignItems: "center",
          }}
          ref={filterRef}
        >
          {filterInView && (
            <>
              <Button
                onClick={handleButtonClick}
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
              >
                Todo
              </Button>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Estilo</InputLabel>
                <Select
                  multiple
                  value={selectedEstilos}
                  onChange={handleEstiloChange}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  sx={{
                    borderRadius: "16px",
                    "& .MuiSelect-select": {
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                  }}
                >
                  {styles.map((estilo) => (
                    <MenuItem key={estilo} value={estilo}>
                      <Checkbox
                        checked={selectedEstilos.indexOf(estilo) > -1}
                      />
                      <ListItemText primary={estilo} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Ocasión</InputLabel>
                <Select
                  multiple
                  value={selectedOcasiones}
                  onChange={handleOcasionChange}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  sx={{
                    borderRadius: "16px",
                    "& .MuiSelect-select": {
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: pink,
                    },
                  }}
                >
                  {occasions.map((ocasion) => (
                    <MenuItem key={ocasion} value={ocasion}>
                      <Checkbox
                        checked={selectedOcasiones.indexOf(ocasion) > -1}
                      />
                      <ListItemText primary={ocasion} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Similar section for cuerpos if required */}
            </>
          )}
        </Box>
        <Grid container spacing={4} sx={{ marginBottom: 10 }} ref={catalogRef}>
          {catalogInView &&
            filteredCatalogData.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: '100%', // Ensure the card takes the full height of the grid item
                  }}
                >
                  <CardActionArea 
                    sx={{
                      height: '100%', // Ensure the CardActionArea takes the full height of the card
                      display: 'flex',
                      flexDirection: 'column', // Ensure the content is stacked vertically
                    }}
                    onClick={() => navigate(`/catalogo/${item.id}`)}
                  >
                    <Box 
                      sx={{
                        width: "100%",
                        height: 0,
                        paddingTop: "75%", // Aspect ratio of 4:3
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
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: myOutfits.includes(item.id.toString()) ? yellow : "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleToggleOutfit(item.id)}
                  >
                    <StarIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box ref={footerRef}>{footerInView && <Footer />}</Box>
      </Box>
    </Slide>
  );
};

export default Catalog;
