import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, TextField, MenuItem, Grid, Typography, IconButton, Avatar, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Select, InputLabel, FormControl, Chip, OutlinedInput, Card, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import getOutfits from '../../supabase/CatalogoServices/getOutfits';
import updateOutfit from '../../supabase/CatalogoServices/updateOutfit';
import { getStyles, getOccasions } from '../../supabase/CatalogoServices/getStylesAndOccasions';
import { getPrendasByOutfitId } from '../../supabase/CatalogoServices/getPrendasByOutfitId';
import { updatePrendas } from '../../supabase/CatalogoServices/updatePrendas';
import createPrenda from '../../supabase/CatalogoServices/createPrenda';
import { uploadImage } from '../../supabase/CatalogoServices/updateImage';
import createOutfit from '../../supabase/CatalogoServices/createOutfit';
import { SelectChangeEvent } from '@mui/material/Select';
import deleteOutfit from '../../supabase/CatalogoServices/deleteOutfit';
import deletePrenda from '../../supabase/CatalogoServices/deletePrenda';
import { Outfit, Prenda, Style, Occasion } from "../../supabase/CatalogoServices/types";

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<Outfit[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [initialPrendas, setInitialPrendas] = useState<Prenda[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [styles, setStyles] = useState<Style[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPrendaFiles, setSelectedPrendaFiles] = useState<(File | null)[]>([]);
  const [prendasToDelete, setPrendasToDelete] = useState<number[]>([]);

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

  const handleEditClick = async (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    const prendasData = await getPrendasByOutfitId(outfit.id);
    setPrendas(prendasData);
    setInitialPrendas(prendasData);
    setSelectedPrendaFiles(prendasData.map(() => null));
    setShowForm(true);
  };

  const handleAddClick = () => {
    setSelectedOutfit({
      id: 0,
      nombre: '',
      descripcion: '',
      estilo: '',
      id_estilo: 0,
      imagen: '',
      ocasiones: [],
    });
    setPrendas([{ id: 0, nombre: '', link: '', id_outfit: 0 }]);
    setSelectedFile(null);
    setSelectedPrendaFiles([null]);
    setShowForm(true);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedOutfit) {
      const { name, value } = event.target;
      setSelectedOutfit({ ...selectedOutfit, [name]: value });
    }
  };

  const handlePrendaChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedPrendas = prendas.map((prenda, i) => (i === index ? { ...prenda, [name]: value } : prenda));
    setPrendas(updatedPrendas);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, type: 'outfit' | 'prenda', index?: number) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    if (type === 'outfit') {
      setSelectedFile(file);
      if (selectedOutfit) {
        setSelectedOutfit({ ...selectedOutfit, imagen: URL.createObjectURL(file) });
      }
    } else if (type === 'prenda' && index !== undefined) {
      const updatedPrendaFiles = selectedPrendaFiles.map((prendaFile, i) => (i === index ? file : prendaFile));
      setSelectedPrendaFiles(updatedPrendaFiles);
      const updatedPrendas = prendas.map((prenda, i) => (i === index ? { ...prenda, imagen: URL.createObjectURL(file) } : prenda));
      setPrendas(updatedPrendas);
    }
  };

  const handleOccasionChange = (event: SelectChangeEvent<string[]>) => {
    if (selectedOutfit) {
      setSelectedOutfit({ ...selectedOutfit, ocasiones: event.target.value as string[] });
    }
  };

  const addPrenda = () => {
    setPrendas([...prendas, { id: 0, nombre: '', link: '', id_outfit: 0 }]);
    setSelectedPrendaFiles([...selectedPrendaFiles, null]);
  };

  const handleDeletePrenda = (index: number) => {
    const prendaToDelete = prendas[index];
    if (prendaToDelete.id !== 0) {
      setPrendasToDelete([...prendasToDelete, prendaToDelete.id]);
    }
    const updatedPrendas = prendas.filter((_, i) => i !== index);
    setPrendas(updatedPrendas);
    const updatedPrendaFiles = selectedPrendaFiles.filter((_, i) => i !== index);
    setSelectedPrendaFiles(updatedPrendaFiles);
  };

  const handleFormSubmit = async () => {
    if (selectedOutfit) {
      const occasionIds = selectedOutfit.ocasiones.map((ocasion) => {
        const occasionObject = occasions.find(o => o.ocasion === ocasion);
        return occasionObject ? occasionObject.id : null;
      }).filter(id => id !== null) as number[];

      if (selectedOutfit.id === 0) {
        const newOutfitId = await createOutfit({
          nombre: selectedOutfit.nombre,
          descripcion: selectedOutfit.descripcion,
          id_estilo: selectedOutfit.id_estilo,
          ocasiones: occasionIds,
        });

        if (newOutfitId) {
          if (selectedFile) {
            const imageUrl = await uploadImage(selectedFile, 'outfit', newOutfitId);
            if (imageUrl) {
              await updateOutfit({
                id: newOutfitId,
                imagen: imageUrl,
              });
            }
          }

          for (let i = 0; i < prendas.length; i++) {
            const prenda = prendas[i];
            const prendaFile = selectedPrendaFiles[i];
            const newPrendaId = await createPrenda({ nombre: prenda.nombre, link: prenda.link, id_outfit: newOutfitId });
            if (newPrendaId && prendaFile) {
              const prendaImageUrl = await uploadImage(prendaFile, 'prenda', newOutfitId, newPrendaId);
              if (prendaImageUrl) {
                await updatePrendas([{ id: newPrendaId, nombre: prenda.nombre, link: prenda.link, id_outfit: newOutfitId, imagen: prendaImageUrl }]);
              }
            }
          }
        }
      } else {
        await updateOutfit({
          id: selectedOutfit.id,
          nombre: selectedOutfit.nombre,
          descripcion: selectedOutfit.descripcion,
          id_estilo: selectedOutfit.id_estilo,
          ocasiones: occasionIds,
        });

        for (let i = 0; i < prendas.length; i++) {
          const prenda = prendas[i];
          const prendaFile = selectedPrendaFiles[i];

          if (prenda.id === 0) {
            const newPrendaId = await createPrenda({ nombre: prenda.nombre, link: prenda.link, id_outfit: selectedOutfit.id });
            if (newPrendaId && prendaFile) {
              const prendaImageUrl = await uploadImage(prendaFile, 'prenda', selectedOutfit.id, newPrendaId);
              if (prendaImageUrl) {
                await updatePrendas([{ id: newPrendaId, nombre: prenda.nombre, link: prenda.link, id_outfit: selectedOutfit.id, imagen: prendaImageUrl }]);
              }
            }
          } else {
            if (prendaFile) {
              const prendaImageUrl = await uploadImage(prendaFile, 'prenda', selectedOutfit.id, prenda.id);
              if (prendaImageUrl) {
                await updatePrendas([{ ...prenda, imagen: prendaImageUrl }]);
              }
            } else {
              await updatePrendas([prenda]);
            }
          }
        }

        if (selectedFile) {
          const imageUrl = await uploadImage(selectedFile, 'outfit', selectedOutfit.id);
          if (imageUrl) {
            await updateOutfit({
              id: selectedOutfit.id,
              imagen: imageUrl,
            });
          }
        }

        for (const prendaId of prendasToDelete) {
          await deletePrenda(prendaId, selectedOutfit.id);
        }
      }

      setShowForm(false);
      const data = await getOutfits();
      setRows(data);
    }
  };

  const handleCancelClick = () => {
    setPrendas(initialPrendas);
    setSelectedOutfit(null);
    setPrendasToDelete([]);
    setSelectedFile(null);
    setSelectedPrendaFiles([]);
    setShowForm(false);
  };

  const handleDeleteClick = async (outfitId: number) => {
    try {
      await deleteOutfit(outfitId);
      const data = await getOutfits();
      setRows(data);
    } catch (error) {
      console.error('Error deleting outfit:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button onClick={handleCancelClick} variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#E61F93' }}>
            Regresar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            {selectedOutfit?.id === 0 ? 'Agregar Outfit' : 'Editar Outfit'}
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
              <FormControl fullWidth variant="outlined" sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                label="Descripción del outfit"
                variant="outlined"
                multiline
                rows={10}
                name="descripcion"
                value={selectedOutfit?.descripcion || ''}
                onChange={handleFormChange}
                sx={{
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box>
                <Typography variant="h6">Imagen Principal</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'outfit')}
                  style={{ display: 'none' }}
                  id="main-outfit-upload"
                />
                <label htmlFor="main-outfit-upload">
                  <Card sx={{ width: '100%', height: '230px', borderRadius: '16px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', overflow: 'hidden', cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={selectedOutfit?.imagen || 'https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg'}
                      alt="Outfit image"
                      sx={{ objectFit: 'cover', height: '100%' }}
                    />
                  </Card>
                </label>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
  <Typography variant="h6">Prendas</Typography>
  <IconButton onClick={addPrenda} sx={{ 
    mt: 2, 
    backgroundColor: '#E61F93', 
    color: 'white', 
    width: 38, 
    height: 38, 
    borderRadius: '50%', 
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    } 
  }}>
    <AddIcon />
  </IconButton>
</Box>

{prendas.map((prenda, index) => (
  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'prenda', index)}
        style={{ display: 'none' }}
        id={`upload-button-${index}`}
      />
      <label htmlFor={`upload-button-${index}`}>
        <Avatar 
          src={prenda.imagen || 'https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg'} 
          alt={prenda.nombre} 
          sx={{ width: 100, height: 100, borderRadius: '12px', cursor: 'pointer' }} 
        />
      </label>
    </Box>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Nombre de la prenda"
        variant="outlined"
        fullWidth
        name="nombre"
        value={prenda.nombre}
        onChange={(e) => handlePrendaChange(index, e)}
        sx={{
          borderRadius: '24px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
          },
        }}
      />
      <TextField
        label="Link de la prenda"
        variant="outlined"
        fullWidth
        name="link"
        value={prenda.link}
        onChange={(e) => handlePrendaChange(index, e)}
        sx={{
          borderRadius: '24px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
          },
        }}
      />
    </Box>
    <IconButton onClick={() => handleDeletePrenda(index)} sx={{ alignSelf: 'center', color:'#E61F93'}}>
      <DeleteIcon />
    </IconButton>
  </Box>
))}


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
              <Button onClick={handleAddClick} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto' }}>
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
                    <Avatar 
          src={row.imagen} 
          alt={row.nombre} 
          sx={{ 
            width: 56, 
            height: 56, 
            margin: 'auto', 
            borderRadius: '5px'
          }} 
        />
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
                      <IconButton onClick={() => handleDeleteClick(row.id)}>
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
