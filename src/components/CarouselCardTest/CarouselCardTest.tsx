import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "María G",
    opinion: "Gracias a Xianna, descubrí mi estilo personal y ahora me siento más segura.",
    avatar: "user1.jpg",
  },
  {
    name: "Ana L.",
    opinion: "Las recomendaciones de Xianna son prácticas y fáciles de seguir.",
    avatar: "user2.jpg",
  },
  {
    name: "Paola R",
    opinion: "Xianna me ha enseñado a transformar mi guardarropa con prendas básicas.",
    avatar: "user1.jpg",
  },
  {
    name: "Rodrigo M.",
    opinion: "Me encanta cómo Xianna hace que la moda sea accesible para todos",
    avatar: "user2.jpg",
  },
];

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, display: "block", color: "white" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      className={className}
      style={{ ...style, display: "block", color: "white" }}
      onClick={onClick}
    />
  );
};

const CarouselCardTest: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const blue = "#00D1ED";

  return (
    <Card
      className="flex flex-col h-full"
      sx={{ backgroundColor: blue, color: "white", padding: 4 }}
    >
      <CardContent
        className="flex-grow"
        sx={{ padding: 2, justifyContent: "center", textAlign: "center" }}
      >
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              className="flex flex-col items-center justify-center"
              sx={{ padding: 2 }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", fontSize: {
                  xs: '20px', // Tamaño de fuente para pantallas pequeñas
                  sm: '24px', // Tamaño de fuente para pantallas medianas
                  md: '28px', // Tamaño de fuente para pantallas grandes
                  lg: '30px', // Tamaño de fuente para pantallas extra grandes
              }, }}
              >
                {testimonial.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: {
                  xs: '16px', // Tamaño de fuente para pantallas pequeñas
                  sm: '19px', // Tamaño de fuente para pantallas medianas
                  md: '20px', // Tamaño de fuente para pantallas grandes
                  lg: '22px', // Tamaño de fuente para pantallas extra grandes
              }, }}>
                {testimonial.opinion}
              </Typography>
            </Box>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default CarouselCardTest;
