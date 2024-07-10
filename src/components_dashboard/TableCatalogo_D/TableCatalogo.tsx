import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, TablePagination, Typography, Button, TextField, MenuItem, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const rows = [
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  {
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Nombre del outfit',
    styles: ['Seductor'],
    occasions: ['Ocasión', 'Ocasión'],
    favorites: 100,
  },
  // Add more rows as needed
];

const CatalogoTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [uploadFields, setUploadFields] = useState([0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleAddUploadField = () => {
    setUploadFields([...uploadFields, uploadFields.length]);
  };

  const UploadButton = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '24px',
        width: '100%',
        height: '100px',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        margin: '16px 0',
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 40, color: 'black' }} />
      <Button
        variant="contained"
        sx={{
          marginTop: '8px',
          backgroundColor: '#E61F93',
          borderRadius: '20px',
          textTransform: 'none',
          boxShadow: 'none',
        }}
      >
        Subir
      </Button>
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button onClick={handleHideForm} variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#E61F93' }}>
            Regresar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Catálogo
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre del outfit"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Estilo"
                variant="outlined"
                select
                fullWidth
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              >
                <MenuItem value="Estilo 1">Estilo 1</MenuItem>
                <MenuItem value="Estilo 2">Estilo 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Ocasión"
                variant="outlined"
                select
                fullWidth
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              >
                <MenuItem value="Ocasión 1">Ocasión 1</MenuItem>
                <MenuItem value="Ocasión 2">Ocasión 2</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <TextField
            label="Descripción del outfit"
            variant="outlined"
            multiline
            rows={4}
            sx={{
              borderRadius: '24px',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            Imagen principal
          </Typography>
          <UploadButton />
          <Typography variant="h6" fontWeight="bold">
            Prendas
          </Typography>
          <Grid container spacing={2}>
            {uploadFields.map((field, index) => (
              <Grid container item xs={12} spacing={2} key={index} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <UploadButton />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Nombre de la prenda"
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Link"
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={handleAddUploadField} sx={{ fontSize: 40 }}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', mt: 2 }}>
            Guardar
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
              Catálogo
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
                Reporte
              </Button>
              <Button onClick={handleShowForm} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto' }}>
                Agregar
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }}>Imagen</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Nombre</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Estilo</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Ocasiones</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Favoritos</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar src={row.image} alt={row.name} sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.name}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.styles.map((style, idx) => (
                        <Box key={idx} sx={{ backgroundColor: '#00D1ED', borderRadius: '12px', padding: '4px 8px', display: 'inline-block', marginRight: '4px', color: 'white', fontWeight: 'bold' }}>
                          {style}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.occasions.map((occasion, idx) => (
                        <Box key={idx} sx={{ backgroundColor: '#00D1ED', borderRadius: '12px', padding: '4px 4px', marginBottom: '4px', color: 'white', fontWeight: 'bold' }}>
                          {occasion}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.favorites}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default CatalogoTable;
