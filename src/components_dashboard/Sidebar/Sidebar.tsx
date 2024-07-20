import React from 'react';
import { Box, Avatar, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'insights', key: 'insights' },
  { text: 'Usuarios', key: 'usuarios' },
  { text: 'Catálogo', key: 'catalogo' },
  { text: 'Formulario', key: 'formulario' },
  { text: 'Blogs', key: 'blogs' },
];

const Sidebar: React.FC<{ selectedKey: string, onSelect: (key: string) => void }> = ({ selectedKey, onSelect }) => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: 3,
        padding: '20px',
        textAlign: 'center',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <img
          src="https://your-logo-url.com/logo.png"
          alt="Xianna Logo"
          style={{ width: '100px', marginBottom: '10px' }}
        />
        <Avatar
          src="https://your-profile-image-url.com/profile.jpg"
          alt="User Profile"
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => onSelect(item.key)}
              sx={{
                borderRadius: '20px',
                bgcolor: item.key === selectedKey ? '#E61F93' : '#f7f7f7',
                margin: '10px 0'
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: item.key === selectedKey ? 'white' : 'black',
                  textAlign: 'center'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto', padding: '20px 0' }}>
        <Button
          onClick={() => alert('Cerrar sesión')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            textTransform: 'none',
            margin: '10px auto'
          }}
        >
          <LogoutIcon sx={{ marginRight: '10px' }} />
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
