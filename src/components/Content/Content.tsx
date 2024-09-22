import React from "react";
import { Box, Typography } from "@mui/material";

const Content: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Box>
      <Typography 
  variant="body1" 
  sx={{ 
    marginBottom: 4, 
    fontSize: {
      xs: '16px', 
      sm: '16px',
      md: '16px',
      lg: '16px',
    },
    '& ul': {
      listStyleType: 'disc', // Aplica bullets para listas no ordenadas
      paddingLeft: '20px',   // Añade espacio a la izquierda para la indentación
      marginBottom: '16px',  // Añade espacio entre el contenido y la lista
    },
    '& ol': {
      listStyleType: 'decimal', // Aplica números para listas ordenadas
      paddingLeft: '20px',      // Añade espacio a la izquierda para la indentación
      marginBottom: '16px',     // Añade espacio entre el contenido y la lista
    },
    '& li': {
      marginBottom: '10px', // Añade espacio entre los elementos de la lista
    },
    // Estilos para los encabezados (h1, h2, etc.)
    '& h1': {
      fontSize: '2rem', // Tamaño de fuente para H1
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    '& h2': {
      fontSize: '1.75rem', // Tamaño de fuente para H2
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    '& h3': {
      fontSize: '1.5rem', // Tamaño de fuente para H3
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    '& h4': {
      fontSize: '1.25rem', // Tamaño de fuente para H4
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    '& h5': {
      fontSize: '1rem', // Tamaño de fuente para H5
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    '& h6': {
      fontSize: '0.875rem', // Tamaño de fuente para H6
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
  }}
  dangerouslySetInnerHTML={{ __html: content }} // Renderiza el contenido como HTML
/>
    </Box>
  );
};

export default Content;
