import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        padding: 2,
        borderRadius: "20px",
        textAlign: "center",
        marginTop: 5

      }}
    >
      <Typography variant="body2">
        © Copyright 2024 by{" "}
        <Link
          href="https://amoxliwebdevelopers.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "white", textDecoration: "underline" }}
        >
          Amoxli Web Developers
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
