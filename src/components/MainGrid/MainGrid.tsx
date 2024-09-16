import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import LargeButton from "../LargeButton/LargeButton";
import SmallButton from "../SmallButton/SmallButton";
import CarouselCardTest from "../CarouselCardTest/CarouselCardTest";

import placeholder1 from "../../assets/placeholders/place1.jpg";
import x from "../../assets/logo/x.png";

const MainGrid: React.FC = () => {
  const pink = "#E61F93";
  const yellow = "#FDE12D";
  const blue = "#00D1ED";
  const lightpink = "#FAACC1";
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{ backgroundColor: pink, color: "white", padding: 2 }}
        >
          <CardContent className="flex-grow">
            <div className="flex items-center mb-4">
              <Avatar
                sx={{ bgcolor: "white", width: 80, height: 80, marginRight: 2 }}
              >
                <img src={x} alt="main-logo" />
              </Avatar>
              <Typography
                variant="h1"
                className="ml-4"
                sx={{ fontWeight: "bold", fontSize: {
                  xs: '24px', 
                  sm: '28px',
                  md: '32px',
                  lg: '40px',
                },}}
              >
                ¿Qué es Xianna?
              </Typography>
            </div>
            <Typography variant="body1" sx={{ fontSize: {
                xs: '18px', 
                sm: '20px',
                md: '22px',
                lg: '24px',
              }, }}>
              Xianna es tu guía en moda y estilo personal. Descubre tendencias, consejos y tips para sentirte auténtica y segura todos los días.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{
            color: "white",
            backgroundColor: yellow,
            padding: 2,
            position: "relative",
          }}
        >
          <CardContent className="flex-grow flex justify-center items-center">
            <Typography
              variant="h2"
              sx={{ fontSize: {
                xs: '24px', 
                sm: '28px',
                md: '32px',
                lg: '40px',
              }, fontWeight: "bold" }}
            >
              Cuestionario de Estilo
            </Typography>
          </CardContent>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SmallButton
              backgroundColor="white"
              arrowColor="black"
              link="/formulario"
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sm={12}>
        <Card
          className="bg-blue-500 text-white flex flex-col items-center h-full"
          sx={{ color: "white", backgroundColor: blue, padding: 2 }}
        >
          <CardContent className="flex-grow flex justify-center items-center">
            <Typography
              variant="h3"
              sx={{ fontSize: {
                xs: '24px', 
                sm: '28px',
                md: '32px',
                lg: '40px',
              }, fontWeight: "bold", textAlign: "center" }}
            >
              Forma parte de Xianna
            </Typography>
          </CardContent>
          <LargeButton
            text="Continua"
            link="/registro"
            textColor="black"
            arrowColor="black"
            backgroundColor="white"
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            height: { xs: "auto", md: "100%" },
          }}
        >
          <CardContent className="flex-grow p-0" sx={{ position: "relative", height: { xs: "250px", md: "100%" } }}>
            <img
              src={placeholder1}
              alt="Catálogo"
              className="w-full h-full object-cover"
              style={{
                borderRadius: "inherit",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%", // Asegura que la imagen cubra todo el contenedor
                objectFit: "cover", // Ajusta la imagen para cubrir sin distorsión
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                borderRadius: "inherit",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LargeButton
                text="Catálogo"
                link="/catalogo"
                textColor="black"
                arrowColor="black"
                backgroundColor="white"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sm={12}>
        <Card className="flex flex-col h-full" sx={{ padding: 2 }}>
          <CardContent className="flex-grow flex justify-center items-center p-3">
            <Typography
              variant="h5"
              sx={{ fontSize: {
                xs: '24px', 
                sm: '28px',
                md: '32px',
                lg: '40px',
              }, fontWeight: "bold", textAlign: "center" }}
            >
              La moda pasa, pero el estilo permanece.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{
            backgroundColor: lightpink,
            color: "white",
            padding: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent className="flex-grow">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: {
                xs: '24px', 
                sm: '28px',
                md: '32px',
                lg: '40px',
              }, }}
            >
              Blog Xianna
            </Typography>
            <Typography variant="body1" sx={{ fontSize: {
                  xs: '18px', 
                  sm: '20px',
                  md: '22px',
                  lg: '24px',
                }, }}>
              Descubre las últimas tendencias en moda, belleza y estilo de vida. Encuentra inspiración para expresar tu mejor versión.
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              marginTop: "auto",
            }}
          >
            <LargeButton
              text="Leer Blog"
              link="/blog"
              textColor="black"
              arrowColor="black"
              backgroundColor="white"
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sm={12}>
        <a
          href="https://www.instagram.com/xianna"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <Card
            className="flex flex-col items-center justify-center h-full cursor-pointer"
            sx={{ backgroundColor: lightpink, color: "white", padding: 2 }}
          >
            <CardContent className="flex-grow flex items-center justify-center">
              <InstagramIcon sx={{ color: "white", fontSize: 80 }} />
              <Typography
                variant="h6"
                className="text-white mt-2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                @xianna
              </Typography>
            </CardContent>
          </Card>
        </a>
      </Grid>

      <Grid item xs={12} md={4} sm={12}>
        <CarouselCardTest />
      </Grid>
      <Grid item xs={12} md={4} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{
            backgroundColor: pink,
            color: "white",
            padding: 2,
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <CardContent className="flex-grow flex items-center justify-center">
            <Typography
              variant="h6"
              className="text-white"
              sx={{ fontWeight: "bold", fontSize: {
                xs: '24px', 
                sm: '28px',
                md: '32px',
                lg: '40px',
            }, }}
            >
              Contáctanos
            </Typography>
          </CardContent>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
          >
            <SmallButton
              backgroundColor="white"
              arrowColor="black"
              link="/contacto"
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainGrid;
