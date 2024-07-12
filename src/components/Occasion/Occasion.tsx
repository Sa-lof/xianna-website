// src/components/Occasions/Occasions.tsx

import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const Occasions: React.FC<{ occasions: string[] }> = ({ occasions }) => {
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
                <EventIcon sx={{ marginBottom: 1, fontSize: 60 }} />
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
