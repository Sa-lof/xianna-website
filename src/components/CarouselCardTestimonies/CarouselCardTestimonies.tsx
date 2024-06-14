import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonials = [
  {
    name: "Nombre usuario 1",
    opinion: "Opinión 1",
    avatar: "user1.jpg",
  },
  {
    name: "Nombre usuario 2",
    opinion: "Opinión 2",
    avatar: "user2.jpg",
  },
];

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      className={className}
      style={{ ...style, display: "block", color: "black" }}
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

  return (
    <Card className="flex flex-col items-center h-full" sx={{backgroundColor: "blue"}}>
      <CardContent className="flex-grow">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-center justify-center">
              <Avatar
                sx={{ width: 56, height: 56, marginRight: 2 }}
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <div>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", fontSize: "32px" }}
                >
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "24px" }}>
                  {testimonial.opinion}
                </Typography>
              </div>
            </div>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
};

export default CarouselCardTest;
