import React from "react";
import { Button } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import { SxProps } from "@mui/system";

interface LargeButtonProps {
  text: string;
  link: string;
  textColor?: string;
  arrowColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
  sx?: SxProps; // Add the sx prop to the interface
}

const LargeButton: React.FC<LargeButtonProps> = ({
  text,
  link,
  textColor = "black",
  arrowColor = "black",
  backgroundColor = "white",
  onClick,
  sx = {}, // Default value for sx
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={onClick ? onClick : () => navigate(link)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 24px",
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: "50px",
        width: "fit-content",
        textTransform: "none",
        boxShadow: "none",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: backgroundColor,
          transform: "scale(1.1)",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "none",
        },
        ...sx, // Apply additional styles from the sx prop
      }}
    >
      <span>{text}</span>
      <ArrowOutwardIcon sx={{ marginLeft: "8px", color: arrowColor }} />
    </Button>
  );
};

export default LargeButton;
