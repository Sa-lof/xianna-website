import React, { useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, IconButton, Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const users = [
  {
    id: 1,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 2,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 3,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 4,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 5,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 6,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 1,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 2,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 1,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 2,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 1,
    name: 'Nombre usuario',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  {
    id: 2,
    name: 'Nombre usuario2',
    email: 'correo@correo.com',
    styleType: 'Seductor',
    profession: 'Abogado',
    age: 44,
    bodyType: 'Rectángulo',
    size: 'Mediana',
    city: 'Ciudad de México',
    avatar: 'https://example.com/avatar.jpg'
  },
  // Add more users as needed
]

const UserProfile = () => {
    const [selectedUser, setSelectedUser] = useState(users[0]);
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
            Usuarios
            </Typography>
            <Button variant="contained" sx={{borderRadius:'20px', backgroundColor:'#E61F93', flex: '0 1 auto', marginTop: { xs: 1, sm: 0 } }}>
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
                  selected={selectedUser.id === user.id}
                  onClick={() => setSelectedUser(user)}
                  sx={{ borderRadius: 2, marginBottom: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.styleType} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flex: 1, padding: 2, minWidth: '300px' }}>
            <Paper sx={{ padding: 2, borderRadius: 2, backgroundColor: '#F8BBD0', minWidth: '280px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" fontWeight="bold">
                    {selectedUser.name}
                  </Typography>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                  <Avatar src={selectedUser.avatar} sx={{ width: 56, height: 56, marginRight: 2 }} />
                  <Typography variant="body1" fontWeight="bold">
                    {selectedUser.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Tipo de estilo</Typography>
                  <Typography variant="body2">{selectedUser.styleType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Profesión</Typography>
                  <Typography variant="body2">{selectedUser.profession}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Edad</Typography>
                  <Typography variant="body2">{selectedUser.age} años</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Tipo de cuerpo</Typography>
                  <Typography variant="body2">{selectedUser.bodyType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Talla</Typography>
                  <Typography variant="body2">{selectedUser.size}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight="bold">Ciudad</Typography>
                  <Typography variant="body2">{selectedUser.city}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  };
  

export default UserProfile;
