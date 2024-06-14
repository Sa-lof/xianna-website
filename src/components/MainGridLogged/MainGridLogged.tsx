import React from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { pink, blue } from "@mui/material/colors";

const MainGridLogged: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card className="bg-pink-500 text-white flex flex-col h-full">
          <CardContent className="flex-grow">
            <div className="flex items-center mb-4">
              <Avatar sx={{ bgcolor: pink[600], width: 56, height: 56 }}>
                X
              </Avatar>
              <Typography variant="h5" className="ml-4">
                ¿Qué es la Xianna?
              </Typography>
            </div>
            <Typography variant="body1">
              Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
              ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="bg-blue-500 flex flex-col h-full">
          <CardContent className="flex-grow">
            <Typography variant="h5">Cuestionario de Estilo</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className="bg-blue-500 text-white flex flex-col items-center h-full">
          <Avatar
            sx={{ bgcolor: blue[600], width: 56, height: 56 }}
            src="profile.jpg"
            alt="Nombre"
          />
          <Typography variant="body1" className="mt-2">
            Nombre
          </Typography>
          <Typography variant="body2">Estilo</Typography>
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
        <Card className="flex flex-col h-full">
          <CardContent className="flex-grow">
            <Typography variant="h5">Lorem ipsum lorem ipsum lorem</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="bg-pink-300 flex flex-col h-full">
          <CardContent className="flex-grow">
            <Typography variant="h5">Blog Xianna</Typography>
            <Typography variant="body1">
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
        <Card className="bg-pink-400 flex flex-col items-center justify-center h-full">
          <CardContent className="flex-grow flex items-center justify-center">
            <Typography variant="h5" className="text-white">
              @xianna
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className="flex flex-col items-center h-full">
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            <Avatar
              sx={{ width: 56, height: 56 }}
              src="user.jpg"
              alt="Nombre usuario"
            />
            <Typography variant="body1" className="mt-2">
              Nombre usuario
            </Typography>
            <Typography variant="body2">Opinión</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className="bg-pink-500 flex flex-col items-center justify-center h-full">
          <CardContent className="flex-grow flex items-center justify-center">
            <Typography variant="h5" className="text-white">
              Contáctanos
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainGridLogged;
