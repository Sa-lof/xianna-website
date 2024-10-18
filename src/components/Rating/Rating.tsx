import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LargeButton from "../LargeButton/LargeButton";

interface RatingProps {
  initialRating: number;
  onSubmit: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ initialRating, onSubmit }) => {
  const [rating, setRating] = useState(initialRating);
  const pink = "#E61F93";

  const handleRatingClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    onSubmit(rating);
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Califica este artículo
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Tu opinión es importante para mejorar la calidad de nuestro contenido y brindarte información aún más valiosa. 
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                onClick={() => handleRatingClick(index)}
                sx={{
                  fontSize: 80,
                  cursor: "pointer",
                  color: index < rating ? pink : "rgba(0, 0, 0, 0.26)",
                }}
              />
            ))}
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <LargeButton
              backgroundColor={pink}
              arrowColor="white"
              link="#"
              text="Enviar"
              textColor="white"
              onClick={handleSubmit}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Rating;
