import React from 'react';
import { Box, Typography, Grid, Card, Button, MenuItem, TextField } from '@mui/material';

const Insights: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
                Insights
            </Typography>
            <Button variant="contained" sx={{borderRadius:'20px', backgroundColor:'#E61F93', flex: '0 1 auto', marginTop: { xs: 1, sm: 0 } }}>
                Reporte
            </Button>
        </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">00</Typography>
            <Typography variant="body1">Usuarios</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">Outfit más guardado</Typography>
            <Typography variant="body1">Nombre outfit</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">Blog preferido</Typography>
            <Typography variant="body1">Categoría</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
            </Box>
            <Typography variant="h5" fontWeight="bold">Gráfica</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
            </Box>
            <Typography variant="h5" fontWeight="bold">Gráfica</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
            </Box>
            <Typography variant="h5" fontWeight="bold">Gráfica</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
              <TextField select size="small" defaultValue="Filtro" variant="outlined" sx={{ width: '45%' }}>
                <MenuItem value="Filtro">Filtro</MenuItem>
                {/* Agregar más opciones si es necesario */}
              </TextField>
            </Box>
            <Typography variant="h5" fontWeight="bold">Gráfica</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
