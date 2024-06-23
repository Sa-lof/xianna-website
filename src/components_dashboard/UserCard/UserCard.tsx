import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserCardProps {
  user: {
    Imagen: string;
    Nombre: string;
    Correo: string;
    Estilo: string;
    Ciudad: string;
    Profesion: string;
    Edad: number;
    TipoDeCuerpo: string;
    Talla: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Paper sx={{ padding: 4, borderRadius: 2, backgroundColor: '#FAACC1', minWidth: 800, color:'white'}}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" sx={{ fontWeight: 'bold'}}>{user.Nombre}</Typography>
        <IconButton aria-label="delete">
          <DeleteIcon sx={{color: 'white'}} />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar alt={user.Nombre} src={user.Imagen} sx={{ width: 80, height: 80, marginRight: 3 }} />
        <Box>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Correo</Typography>
          <Typography>{user.Correo}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Tipo de estilo</Typography>
          <Typography>{user.Estilo}</Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Ciudad</Typography>
          <Typography>{user.Ciudad}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Profesión</Typography>
          <Typography>{user.Profesion}</Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Edad</Typography>
          <Typography>{user.Edad} años</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Tipo de cuerpo</Typography>
          <Typography>{user.TipoDeCuerpo}</Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 2 }}>Talla</Typography>
          <Typography>{user.Talla}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserCard;
