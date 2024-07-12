import React from 'react';
import { IconButton } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';

interface SmallButtonProps {
  backgroundColor?: string;
  arrowColor?: string;
  link: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({ backgroundColor = 'white', arrowColor = 'black', link }) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate(link)}
      sx={{
        color: arrowColor,
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        width: 40,
        height: 40,
        '&:hover': {
          backgroundColor: backgroundColor,
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      <ArrowOutwardIcon sx={{ color: arrowColor }} />
    </IconButton>
  );
};

export default SmallButton;
