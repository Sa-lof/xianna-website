import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WorkIcon from "@mui/icons-material/Work";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import DiamondIcon from '@mui/icons-material/Diamond';

interface OccasionsProps {
  occasions: string[];
}

const Occasions: React.FC<OccasionsProps> = ({ occasions }) => {
  const getIconForOccasion = (occasion: string) => {
    switch (occasion.toLowerCase()) {
      case "cita romántica":
        return <FavoriteIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "boda":
        return <DiamondIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "fiesta":
        return <CelebrationIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "concierto":
        return <MusicNoteIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "comida familiar":
        return <RestaurantIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "trabajo":
        return <WorkIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "evento deportivo":
        return <SportsSoccerIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "vacaciones":
        return <BeachAccessIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "graduación":
        return <SchoolIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      case "salida con amigos":
        return <GroupIcon sx={{ marginBottom: 1, fontSize: 60 }} />;
      default:
        return <GroupIcon sx={{ marginBottom: 1, fontSize: 60 }} />; // Default icon
    }
  };

  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {occasions.map((occasion, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#00CFFF",
                  color: "white",
                  padding: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {getIconForOccasion(occasion)}
                <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "24px" }}>
                  {occasion}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Occasions;
