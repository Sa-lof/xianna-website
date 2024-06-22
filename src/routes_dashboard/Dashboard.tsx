import React from "react";
import Drawer from "../components_dashboard/Drawer/Drawer";
import { Box } from "@mui/material";
import '../../src/App.css';

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3, md: 3, lg: 4, xl: 4 },
      }}
    >
      <Drawer />
    </Box>
  );
};

export default Dashboard;
