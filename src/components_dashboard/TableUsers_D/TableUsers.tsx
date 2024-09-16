import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Grid, Button } from '@mui/material';
import * as XLSX from 'xlsx';  // Importamos XLSX para generar el Excel
import getUsers from '../../supabase/UsersServices/getUsers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';
import logo2 from '../../assets/logo/x.png';

interface User {
  id: number;
  correo: string;
  ciudad: string;
  nombre: string;
  tipo_estilo: number;
  profesion: string;
  edad: number;
  talla: string;
  tipo_cuerpo: string;
  avatar?: string;
}

interface Estilo {
  id: number;
  tipo: string;
}

const UserProfile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [styles, setStyles] = useState<Estilo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsersAndStyles = async () => {
      const [userData, styleData] = await Promise.all([getUsers(), getStyles()]);
      setUsers(userData);
      setStyles(styleData);
      if (userData.length > 0) {
        setSelectedUser(userData[0]);
      }
    };
    fetchUsersAndStyles();
  }, []);

  const getStyleName = (styleId: number) => {
    const style = styles.find(s => s.id === styleId);
    return style ? style.tipo : 'Desconocido';
  };

  const handleDownloadReport = () => {
    // Mapeamos los datos de los usuarios en un formato para el Excel
    const data = users.map(user => ({
      Nombre: user.nombre,
      Correo: user.correo,
      Ciudad: user.ciudad,
      Profesión: user.profesion,
      Edad: user.edad,
      Talla: user.talla,
      'Tipo de cuerpo': user.tipo_cuerpo,
      'Tipo de estilo': getStyleName(user.tipo_estilo),
    }));

    // Creamos un libro de trabajo
    const ws = XLSX.utils.json_to_sheet(data); // Creamos la hoja a partir de los datos
    const wb = XLSX.utils.book_new();          // Creamos un nuevo libro
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios'); // Añadimos la hoja al libro

    // Generamos el archivo y lo descargamos
    XLSX.writeFile(wb, 'reporte_usuarios.xlsx');
  };

  if (!selectedUser) return <div>Loading...</div>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
          Usuarios
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginTop: { xs: 1, sm: 0 }, '&:hover': {
            bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
            '& .MuiTypography-root': {
              color: 'white' // El texto se vuelve blanco en hover
            }
          }, }}
          onClick={handleDownloadReport}  // Evento de clic para descargar el reporte
        >
          Reporte
        </Button>
      </Box>
      <Box sx={{ display: 'flex', overflowX: 'auto', flexDirection: 'row' }}>
        <Box sx={{ minWidth: { xs: '250px', md: '300px' }, maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', flexShrink: 0 }}>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button
                selected={selectedUser?.id === user.id}
                onClick={() => setSelectedUser(user)}
                sx={{
                  borderRadius: 2,
                  marginBottom: 1,
                  backgroundColor: selectedUser?.id === user.id ? '#FAACC1' : 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#FAACC1',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#FAACC1',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#FAACC1',
                  },
                  '.MuiListItemText-secondary': {
                    color: selectedUser?.id === user.id ? '#FFFFFF' : 'inherit',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={logo2} />
                </ListItemAvatar>
                <ListItemText primary={user.nombre} secondary={getStyleName(user.tipo_estilo)} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, padding: 2, minWidth: '300px' }}>
          <Paper sx={{ padding: 2, borderRadius: 2, backgroundColor: '#FAACC1', minWidth: '280px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" color={"white"} fontWeight="bold">
                  {selectedUser.nombre}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <Avatar src={logo2} sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Typography color={"white"} variant="body1" fontWeight="bold">
                  {selectedUser.correo}
                </Typography>
              </Grid>
              {/* Otros detalles del usuario */}
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Tipo de estilo</Typography>
                <Typography variant="body2" color={"white"}>{getStyleName(selectedUser.tipo_estilo)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Profesión</Typography>
                <Typography variant="body2" color={"white"}>{selectedUser.profesion}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Edad</Typography>
                <Typography variant="body2" color={"white"}>{selectedUser.edad} años</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Ciudad</Typography>
                <Typography variant="body2" color={"white"}>{selectedUser.ciudad}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Talla</Typography>
                <Typography variant="body2" color={"white"}>{selectedUser.talla}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color={"white"} fontWeight="bold">Tipo de cuerpo</Typography>
                <Typography variant="body2" color={"white"}>{selectedUser.tipo_cuerpo}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
