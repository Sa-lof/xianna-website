import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton,
  TablePagination, Typography, Button, TextField, MenuItem, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createClient } from '@supabase/supabase-js';
import { fetchOutfits, fetchEstilos, fetchOutfitOcasiones, fetchOcasiones, fetchOutfitById } from '../../services/supabaseService';

const SUPABASE_URL = 'https://fkweyjkmjgluvbaydsac.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2V5amttamdsdXZiYXlkc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NDk3MDQsImV4cCI6MjAzNjIyNTcwNH0.HX6g0Mc8tpnaq1iHkhmGKLEx4S17h96tMiIWKngKVOw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface RowData {
  id_outfit: number;
  image: string;
  name: string;
  styles: string[];
  occasions: string[];
  favorites: number;
}

interface Prenda {
  imagen: File | null;
  imagenNombre: string;
  nombre: string;
  link: string;
  imageUrl: string;
}

interface Outfit {
  id_outfit?: number;
  nombre: string;
  descripcion: string;
  estilo: string;
  ocasiones: string[];
  imagenPrincipal: File | null;
  imagenPrincipalNombre: string;
  prendas: Prenda[];
}

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [uploadFields, setUploadFields] = useState([0]);
  const [outfit, setOutfit] = useState<Outfit>({
    nombre: '',
    descripcion: '',
    estilo: '',
    ocasiones: [],
    imagenPrincipal: null,
    imagenPrincipalNombre: '',
    prendas: [{ imagen: null, imagenNombre: '', nombre: '', link: '', imageUrl: '' }],
  });
  const [estilos, setEstilos] = useState<{ id_estilo: any; tipo: any }[]>([]);
  const [ocasiones, setOcasiones] = useState<{ id_ocasion: any; ocasion: any }[]>([]);
  const fileInputRefPrincipal = useRef<HTMLInputElement>(null);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outfits = await fetchOutfits();
        const estilos = await fetchEstilos();
        const outfitOcasiones = await fetchOutfitOcasiones();
        const ocasiones = await fetchOcasiones();

        const estilosMap = estilos.reduce((acc: any, estilo: any) => {
          acc[estilo.id_estilo] = estilo.tipo;
          return acc;
        }, {});

        const ocasionesMap = ocasiones.reduce((acc: any, ocasion: any) => {
          acc[ocasion.id_ocasion] = ocasion.ocasion;
          return acc;
        }, {});

        const outfitOcasionesMap = outfitOcasiones.reduce((acc: any, item: any) => {
          if (!acc[item.id_outfit]) {
            acc[item.id_outfit] = [];
          }
          acc[item.id_outfit].push(ocasionesMap[item.id_ocasion]);
          return acc;
        }, {});

        const formattedData = outfits.map((outfit: any) => ({
          id_outfit: outfit.id_outfit,
          image: outfit.imageUrl,
          name: outfit.nombre,
          styles: [estilosMap[outfit.id_estilo]],
          occasions: outfitOcasionesMap[outfit.id_outfit] || [],
          favorites: 100,
        }));

        setRows(formattedData);
        setEstilos(estilos);
        setOcasiones(ocasiones);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setOutfit({
      nombre: '',
      descripcion: '',
      estilo: '',
      ocasiones: [],
      imagenPrincipal: null,
      imagenPrincipalNombre: '',
      prendas: [{ imagen: null, imagenNombre: '', nombre: '', link: '', imageUrl: '' }],
    });
  };

  const handleAddUploadField = () => {
    setUploadFields([...uploadFields, uploadFields.length]);
    setOutfit({
      ...outfit,
      prendas: [...outfit.prendas, { imagen: null, imagenNombre: '', nombre: '', link: '', imageUrl: '' }],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOutfit({ ...outfit, [name]: value });
  };

  const handleOcasionesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOutfit({ ...outfit, ocasiones: typeof value === 'string' ? value.split(',') : value });
  };

  const handlePrendaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newPrendas = outfit.prendas.map((prenda, prendaIndex) => {
      if (prendaIndex === index) {
        return { ...prenda, [name]: value };
      }
      return prenda;
    });
    setOutfit({ ...outfit, prendas: newPrendas });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index: number = 0) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (field === 'imagenPrincipal') {
        setOutfit({ ...outfit, imagenPrincipal: file, imagenPrincipalNombre: file.name });
      } else {
        const newPrendas = outfit.prendas.map((prenda, prendaIndex) => {
          if (prendaIndex === index) {
            return { ...prenda, imagen: file, imagenNombre: file.name };
          }
          return prenda;
        });
        setOutfit({ ...outfit, prendas: newPrendas });
      }
    }
  };

  const handleUploadImages = async (outfitId: number) => {
    try {
      if (outfit.imagenPrincipal) {
        const mainImagePath = `uploads/${outfitId}/principal/${outfit.imagenPrincipalNombre}`;
        const { error: principalError } = await supabase
          .storage
          .from('Prendas')
          .upload(mainImagePath, outfit.imagenPrincipal);
        if (principalError) throw principalError;
      }
      
      for (let i = 0; i < outfit.prendas.length; i++) {
        const prenda = outfit.prendas[i];
        if (prenda.imagen) {
          const prendaImagePath = `uploads/${outfitId}/prenda_${i + 1}/${prenda.imagenNombre}`;
          const { error: prendaError } = await supabase
            .storage
            .from('Prendas')
            .upload(prendaImagePath, prenda.imagen);
          if (prendaError) throw prendaError;
        }
      }

      alert('Imágenes subidas exitosamente');
    } catch (error) {
      console.error('Error al subir imágenes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: newOutfitData, error: newOutfitError } = await supabase
        .from('outfits')
        .insert([{
          nombre: outfit.nombre,
          descripcion: outfit.descripcion,
          id_estilo: outfit.estilo,
        }])
        .select('id_outfit')
        .single();
      if (newOutfitError) throw newOutfitError;

      const newOutfitId = newOutfitData.id_outfit;

      for (const prenda of outfit.prendas) {
        const { error: prendaError } = await supabase
          .from('prendas')
          .insert([{
            nombre: prenda.nombre,
            link: prenda.link,
            id_outfit: newOutfitId,
          }]);
        if (prendaError) throw prendaError;
      }

      for (const ocasion of outfit.ocasiones) {
        const { error: ocasionError } = await supabase
          .from('outfit_ocasion')
          .insert([{
            id_outfit: newOutfitId,
            id_ocasion: ocasion,
          }]);
        if (ocasionError) throw ocasionError;
      }

      await handleUploadImages(newOutfitId);

      alert('Outfit guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el outfit:', error);
    }
  };

  const handleDelete = async (id_outfit: number) => {
    try {
      console.log(`Deleting outfit with id: ${id_outfit}`);
  
      const { error: deleteOutfitOcasionError } = await supabase
        .from('outfit_ocasion')
        .delete()
        .eq('id_outfit', id_outfit);
  
      if (deleteOutfitOcasionError) throw deleteOutfitOcasionError;
  
      const { error: deletePrendasError } = await supabase
        .from('prendas')
        .delete()
        .eq('id_outfit', id_outfit);
  
      if (deletePrendasError) throw deletePrendasError;

      const { error: deleteOutfitError } = await supabase
        .from('outfits')
        .delete()
        .eq('id_outfit', id_outfit);
  
      if (deleteOutfitError) throw deleteOutfitError;
  
      const { data: listFilesData, error: listFilesError } = await supabase
        .storage
        .from('Prendas')
        .list(`uploads/${id_outfit}`, { limit: 1000 });
  
      if (listFilesError) throw listFilesError;
  
      const filePaths = listFilesData.map(file => `uploads/${id_outfit}/${file.name}`);
  
      if (filePaths.length > 0) {
        const { error: deleteFilesError } = await supabase
          .storage
          .from('Prendas')
          .remove(filePaths);
  
        if (deleteFilesError) throw deleteFilesError;
      }
  
      // Verificar y eliminar subcarpetas (ejemplo: prenda_1, prenda_2, principal)
      const subfolders = ['prenda_1', 'prenda_2', 'prenda_3', 'prenda_4', 'principal'];
      for (const subfolder of subfolders) {
        const { data: subfolderFilesData, error: subfolderFilesError } = await supabase
          .storage
          .from('Prendas')
          .list(`uploads/${id_outfit}/${subfolder}`, { limit: 1000 });
  
        if (subfolderFilesError) throw subfolderFilesError;
  
        const subfolderFilePaths = subfolderFilesData.map(file => `uploads/${id_outfit}/${subfolder}/${file.name}`);
  
        if (subfolderFilePaths.length > 0) {
          const { error: deleteSubfolderFilesError } = await supabase
            .storage
            .from('Prendas')
            .remove(subfolderFilePaths);
  
          if (deleteSubfolderFilesError) throw deleteSubfolderFilesError;
        }
      }
  
      const { error: deleteFolderError } = await supabase
        .storage
        .from('Prendas')
        .remove([`uploads/${id_outfit}`]);
  
      if (deleteFolderError) throw deleteFolderError;
  
      setRows(rows.filter(row => row.id_outfit !== id_outfit));
  
      alert('Outfit eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el outfit:', error);
    }
  };

  const handleEdit = async (id_outfit: number) => {
    try {
      const selectedOutfit = await fetchOutfitById(id_outfit);

      if (selectedOutfit) {
        setOutfit({
          id_outfit: selectedOutfit.id_outfit,
          nombre: selectedOutfit.nombre,
          descripcion: selectedOutfit.descripcion,
          estilo: selectedOutfit.id_estilo,
          ocasiones: selectedOutfit.ocasiones,
          imagenPrincipal: null,
          imagenPrincipalNombre: selectedOutfit.imageUrl,
          prendas: selectedOutfit.prendas.map((prenda: any) => ({
            imagen: null,
            imagenNombre: prenda.imageUrl,
            nombre: prenda.nombre,
            link: prenda.link,
            imageUrl: prenda.imageUrl,
          })),
        });
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching outfit:', error);
    }
  };

  const UploadButton = ({ onClick, fileName, imageUrl }: { onClick: () => void; fileName?: string, imageUrl?: string }) => (
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
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {imageUrl ? (
        <Avatar src={imageUrl} alt="Uploaded image" sx={{ width: '100%', height: '100%' }} />
      ) : (
        <>
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
            {fileName || 'Subir'}
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                name="nombre"
                value={outfit.nombre}
                onChange={handleChange}
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
                name="estilo"
                value={outfit.estilo}
                onChange={handleChange}
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              >
                {estilos.map((estilo) => (
                  <MenuItem key={estilo.id_estilo} value={estilo.id_estilo}>
                    {estilo.tipo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Ocasión"
                variant="outlined"
                select
                fullWidth
                name="ocasion"
                value={outfit.ocasiones}
                onChange={handleOcasionesChange}
                SelectProps={{
                  multiple: true,
                }}
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                  },
                }}
              >
                {ocasiones.map((ocasion) => (
                  <MenuItem key={ocasion.id_ocasion} value={ocasion.id_ocasion}>
                    {ocasion.ocasion}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            label="Descripción del outfit"
            variant="outlined"
            multiline
            rows={4}
            name="descripcion"
            value={outfit.descripcion}
            onChange={handleChange}
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
          <input
            type="file"
            ref={fileInputRefPrincipal}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'imagenPrincipal')}
          />
          <UploadButton onClick={() => fileInputRefPrincipal.current?.click()} fileName={outfit.imagenPrincipalNombre} imageUrl={outfit.imagenPrincipalNombre} />
          <Typography variant="h6" fontWeight="bold">
            Prendas
          </Typography>
          <Grid container spacing={2}>
            {outfit.prendas.map((prenda, index) => (
              <Grid container item xs={12} spacing={2} key={index} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <input
                    type="file"
                    ref={el => (fileInputRefs.current[index] = el as HTMLInputElement)}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, 'prendaImagen', index)}
                  />
                  <UploadButton onClick={() => fileInputRefs.current[index]?.click()} fileName={prenda.imagenNombre} imageUrl={prenda.imageUrl} />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Link"
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
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={handleAddUploadField} sx={{ fontSize: 40 }}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', mt: 2 }}>
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
                    <TableCell style={{ textAlign: 'center' }}>
                      <Avatar src={row.image} alt={row.name} sx={{ width: 56, height: 56, margin: 'auto' }} />
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
                      <IconButton onClick={() => handleEdit(row.id_outfit)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id_outfit)}>
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
  
