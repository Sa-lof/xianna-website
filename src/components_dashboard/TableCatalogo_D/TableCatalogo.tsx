import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Grid, Typography, IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Avatar, TablePagination, Select, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import getOutfits from '../../supabase/CatalogoServices/getOutfits';
import updateOutfit from '../../supabase/CatalogoServices/updateOutfit';
import { getStyles, getOccasions } from '../../supabase/CatalogoServices/getStylesAndOccasions';
import { SelectChangeEvent } from '@mui/material/Select';

interface Outfit {
  id: number;
  nombre: string;
  descripcion: string;
  estilo: string;
  id_estilo: number;
  imagen: string;
  ocasiones: string[];
}

interface Style {
  id: number;
  tipo: string;
  descripcion: string;
}

interface Occasion {
  id: number;
  ocasion: string;
}

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<Outfit[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [styles, setStyles] = useState<Style[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOutfits();
      setRows(data);

      const fetchedStyles = await getStyles();
      setStyles(fetchedStyles);

      const fetchedOccasions = await getOccasions();
      setOccasions(fetchedOccasions);
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setShowForm(true);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedOutfit) {
      const { name, value } = event.target;
      setSelectedOutfit({ ...selectedOutfit, [name]: value });
    }
  };

  const handleOccasionChange = (event: SelectChangeEvent<string[]>) => {
    if (selectedOutfit) {
      setSelectedOutfit({ ...selectedOutfit, ocasiones: event.target.value as string[] });
    }
  };

  const handleFormSubmit = async () => {
    if (selectedOutfit) {
      console.log('Updating outfit with the following data:', selectedOutfit);
      const occasionIds = selectedOutfit.ocasiones.map((ocasion) => {
        const occasionObject = occasions.find(o => o.ocasion === ocasion);
        return occasionObject ? occasionObject.id : null;
      }).filter(id => id !== null) as number[];

      await updateOutfit({
        id: selectedOutfit.id,
        nombre: selectedOutfit.nombre,
        descripcion: selectedOutfit.descripcion,
        id_estilo: selectedOutfit.id_estilo,
        ocasiones: occasionIds,
      });
      setShowForm(false);
      const data = await getOutfits();
      setRows(data);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button onClick={() => setShowForm(false)} variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#E61F93' }}>
            Regresar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Editar Outfit
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre del outfit"
                variant="outlined"
                fullWidth
                name="nombre"
                value={selectedOutfit?.nombre || ''}
                onChange={handleFormChange}
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
                name="id_estilo"
                value={selectedOutfit?.id_estilo || ''}
                onChange={handleFormChange}
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              >
                {styles.map((style) => (
                  <MenuItem key={style.id} value={style.id}>
                    {style.tipo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Ocasión</InputLabel>
                <Select
                  multiple
                  value={selectedOutfit?.ocasiones || []}
                  onChange={handleOccasionChange}
                  input={<OutlinedInput label="Ocasión" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {occasions.map((occasion) => (
                    <MenuItem key={occasion.id} value={occasion.ocasion}>
                      {occasion.ocasion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            label="Descripción del outfit"
            variant="outlined"
            multiline
            rows={4}
            name="descripcion"
            value={selectedOutfit?.descripcion || ''}
            onChange={handleFormChange}
            sx={{
              borderRadius: '24px',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }}
          />
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', mt: 2 }}
          >
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
              <Button onClick={() => setShowForm(true)} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto' }}>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Avatar src={row.imagen} alt={row.nombre} sx={{ width: 56, height: 56, margin: 'auto' }} />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.nombre}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Box sx={{ backgroundColor: '#00D1ED', borderRadius: '12px', padding: '4px 8px', display: 'inline-block', color: 'white', fontWeight: 'bold' }}>
                        {row.estilo}
                      </Box>
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.ocasiones.map((ocasion, idx) => (
                        <Box key={idx} sx={{ backgroundColor: '#00D1ED', borderRadius: '12px', padding: '4px 4px', marginBottom: '4px', color: 'white', fontWeight: 'bold' }}>
                          {ocasion}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>100</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleEditClick(row)}>
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
