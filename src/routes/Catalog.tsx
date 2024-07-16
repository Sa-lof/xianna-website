import React, { useState } from "react";
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

const pink = "#E61F93";
const yellow = "#FDE12D";

const catalogData = [
  {
    id: "1",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/1",
    estilo: "Seductor",
    ocasion: "Casual",
    cuerpo: "Atlético",
  },
  {
    id: "2",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/2",
    estilo: "Dramático",
    ocasion: "Formal",
    cuerpo: "Delgado",
  },
  {
    id: "3",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/3",
    estilo: "Creativo",
    ocasion: "Fiesta",
    cuerpo: "Atlético",
  },
  {
    id: "4",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/4",
    estilo: "Casual",
    ocasion: "Deportivo",
    cuerpo: "Grande",
  },
  {
    id: "5",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/5",
    estilo: "Seductor",
    ocasion: "Casual",
    cuerpo: "Delgado",
  },
  {
    id: "6",
    image: placeholder, // Replace with the actual image path
    title: "Nombre de outfit",
    link: "/catalogo/6",
    estilo: "Creativo",
    ocasion: "Formal",
    cuerpo: "Atlético",
  },
];

const estilos = ["Seductor", "Dramático", "Creativo", "Casual"];
const ocasiones = ["Casual", "Formal", "Fiesta", "Deportivo"];
const cuerpos = ["Atlético", "Delgado", "Grande"];

const Catalog: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todo");
  const [selectedEstilos, setSelectedEstilos] = useState<string[]>([]);
  const [selectedOcasiones, setSelectedOcasiones] = useState<string[]>([]);
  const [selectedCuerpos, setSelectedCuerpos] = useState<string[]>([]);
  const [myOutfits, setMyOutfits] = useState<string[]>([]);
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

  const handleToggleOutfit = (id: string) => {
    setMyOutfits((prevOutfits) =>
      prevOutfits.includes(id)
        ? prevOutfits.filter((outfitId) => outfitId !== id)
        : [...prevOutfits, id]
    );
  };

  const filteredCatalogData = catalogData.filter((item) => {
    const estiloMatch =
      selectedEstilos.length === 0 || selectedEstilos.includes(item.estilo);
    const ocasionMatch =
      selectedOcasiones.length === 0 ||
      selectedOcasiones.includes(item.ocasion);
    const cuerpoMatch =
      selectedCuerpos.length === 0 || selectedCuerpos.includes(item.cuerpo);
    return estiloMatch && ocasionMatch && cuerpoMatch;
  });

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full viewport height
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
                  {estilos.map((estilo) => (
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
                  {ocasiones.map((ocasion) => (
                    <MenuItem key={ocasion} value={ocasion}>
                      <Checkbox
                        checked={selectedOcasiones.indexOf(ocasion) > -1}
                      />
                      <ListItemText primary={ocasion} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Cuerpo</InputLabel>
                <Select
                  multiple
                  value={selectedCuerpos}
                  onChange={handleCuerpoChange}
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
                  {cuerpos.map((cuerpo) => (
                    <MenuItem key={cuerpo} value={cuerpo}>
                      <Checkbox
                        checked={selectedCuerpos.indexOf(cuerpo) > -1}
                      />
                      <ListItemText primary={cuerpo} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  }}
                >
                  <CardActionArea onClick={() => navigate(item.link)}>
                    <img
                      src={item.image}
                      alt={item.title}
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
                        {item.title}
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
                      color: myOutfits.includes(item.id) ? yellow : "white",
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
