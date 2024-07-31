import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import LargeButton from "../LargeButton/LargeButton";
import SmallButton from "../SmallButton/SmallButton";
import CarouselCardTest from "../CarouselCardTest/CarouselCardTest";

import placeholder1 from "../../assets/placeholders/place1.jpg";
import x from "../../assets/logo/x.png";
import getStyles from "../../supabase/CuestionarioServices/getStyles";

const MainGridLogged: React.FC<{ userName: string, userStyleId: number }> = ({ userName, userStyleId }) => {
  const [userStyle, setUserStyle] = useState<string>("");

  useEffect(() => {
    const fetchStyles = async () => {
      const styles = await getStyles();
      const style = styles.find(s => s.id === userStyleId);
      setUserStyle(style ? style.tipo : "Desconocido");
    };

    fetchStyles();
  }, [userStyleId]);

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
              sx={{ fontSize: "40px", fontWeight: "bold" }}
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
          <Avatar
            sx={{ bgcolor: blue[600], width: 100, height: 100 }}
            src="profile.jpg"
            alt="Nombre"
          />
          <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              {userName}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {userStyle}
            </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              marginTop: "auto",
            }}
          >
            <LargeButton
              text="Ver pefil"
              link="/perfil"
              textColor="black"
              arrowColor="black"
              backgroundColor="white"
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sm={12}>
        <Card
          className="flex flex-col h-full"
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <CardContent className="flex-grow p-0" sx={{ position: "relative" }}>
            <img
              src={placeholder1}
              alt="Catálogo"
              className="w-full h-full object-cover"
              style={{
                borderRadius: "inherit",
                position: "absolute",
                top: 0,
                left: 0,
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
              sx={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}
            >
              Lorem ipsum lorem ipsum lorem
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
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Blog Xianna
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
              ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
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
              sx={{ fontWeight: "bold", fontSize: "40px" }}
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

export default MainGridLogged;
