import React from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const MainGrid: React.FC = () => {
  const pink = "#E61F93";
  const yellow = "#FDE12D";
  const blue = "#00D1ED";
  const lightpink = "#FAACC1";
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-col h-full"
          sx={{ backgroundColor: pink, color: "white", padding: 2 }}
        >
          <CardContent className="flex-grow">
            <div className="flex items-center mb-4">
              <Avatar
                sx={{ bgcolor: "white", width: 80, height: 80, marginRight: 2 }}
              >
                X
              </Avatar>
              <Typography
                variant="h1"
                className="ml-4"
                sx={{ fontWeight: "bold", fontSize: "40px" }}
              >
                ¿Qué es Xianna?
              </Typography>
            </div>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
              ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          className="bg-blue-500 flex flex-col h-full justify-center items-center"
          sx={{ color: "white", backgroundColor: yellow, padding: 2 }}
        >
          <CardContent className="flex-grow flex justify-center items-center">
            <Typography
              variant="h2"
              sx={{ fontSize: "40px", fontWeight: "bold" }}
            >
              Cuestionario de Estilo
            </Typography>
          </CardContent>
          <IconButton
            sx={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "50%",
              width: 60,
              height: 60,
              "&:hover": {
                backgroundColor: "white",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <ArrowOutwardIcon />
          </IconButton>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          className="bg-blue-500 text-white flex flex-col items-center h-full"
          sx={{ color: "white", backgroundColor: blue, padding: 2 }}
        >
          <CardContent className="flex-grow flex justify-center items-center">
            <Typography
              variant="h3"
              sx={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}
            >
              Forma parte de Xianna
            </Typography>
          </CardContent>
          <Button variant="contained" className="bg-white text-blue-500 mt-2">
            Ver Perfil
          </Button>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="flex flex-col h-full">
          <CardContent className="flex-grow">
            <img
              src="catalog.jpg"
              alt="Catálogo"
              className="w-full rounded-lg mb-4"
            />
            <Button variant="contained" className="bg-white text-pink-500">
              Catálogo
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="flex flex-col h-full" sx={{ padding: 2 }}>
          <CardContent className="flex-grow flex justify-center items-center p-3">
            <Typography
              variant="h5"
              sx={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}
            >
              Lorem ipsum lorem ipsum lorem
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          className="flex flex-col h-full"
          sx={{ backgroundColor: lightpink, color: "white", padding: 2 }}
        >
          <CardContent className="flex-grow">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Blog Xianna
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
              ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
            </Typography>
            <Button variant="contained" className="bg-white text-pink-500 mt-2">
              Visitar
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <a
          href="https://www.instagram.com/xianna"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <Card
            className="flex-col items-center justify-center h-full cursor-pointer"
            sx={{ backgroundColor: lightpink, color: "white", padding: 2 }}
          >
            <CardContent className="flex-grow flex flex-col items-center justify-center">
              <InstagramIcon sx={{ color: "white", fontSize: 80 }} />
              <Typography
                variant="h6"
                className="text-white mt-2"
                sx={{ fontWeight: "bold", fontSize: "32px" }}
              >
                @xianna
              </Typography>
            </CardContent>
          </Card>
        </a>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-col items-center h-full"
          sx={{ backgroundColor: blue, color: "white", padding: 2 }}
        >
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            <Avatar
              sx={{ width: 56, height: 56 }}
              src="user.jpg"
              alt="Nombre usuario"
            />
            <Typography
              variant="body1"
              className="mt-2"
              sx={{ fontWeight: "bold", fontSize: "32px" }}
            >
              Nombre usuario
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "24px" }}>
              Opinión
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          className="flex flex-col items-center justify-center h-full"
          sx={{ backgroundColor: pink, color: "white", padding: 1 }}
        >
          <CardContent className="flex-grow flex items-center justify-center">
            <Typography
              variant="h6"
              className="text-white"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Contáctanos
            </Typography>
          </CardContent>
          <IconButton
            sx={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "50%",
              width: 60,
              height: 60,
              "&:hover": {
                backgroundColor: "white",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <ArrowOutwardIcon />
          </IconButton>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainGrid;
