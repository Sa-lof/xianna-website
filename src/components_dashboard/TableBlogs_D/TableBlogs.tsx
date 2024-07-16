import React, { useState, useEffect } from 'react';
import { getBlogs, updateBlog} from '../../services/blogservice'; // Ajusta la ruta según tu estructura de carpetas
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, TablePagination, Typography, Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  persons: number;
}

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [uploadFields, setUploadFields] = useState([0]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogs();
        const formattedData = data.map((blog: any) => ({
          id: blog.id,
          titulo: blog.titulo,
          descripcion: blog.descripcion,
          contenido: blog.contenido,
          image: 'https://via.placeholder.com/150', // Reemplaza con la URL correcta de la imagen si está disponible en tu base de datos
          name: blog.titulo,
          category: 'Categoría', // Ajusta esto según tu estructura de datos
          rating: 5, // Ajusta esto según tu estructura de datos
          persons: 100 // Ajusta esto según tu estructura de datos
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
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
  };

  const handleAddUploadField = () => {
    setUploadFields([...uploadFields, uploadFields.length]);
  };

  const handleEditClick = (blog: Blog) => {
    setCurrentBlog(blog);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentBlog(null);
  };

  const handleEditSave = async () => {
    if (currentBlog) {
      try {
        await updateBlog(currentBlog.id, currentBlog);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === currentBlog.id ? currentBlog : row
          )
        );
        handleEditDialogClose();
      } catch (error) {
        console.error('There was an error updating the blog!', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentBlog((prevBlog) =>
      prevBlog ? { ...prevBlog, [name]: value } : null
    );
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
        width: '150px',
        height: '100px',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        margin: '16px',
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
            Blogs
          </Typography>
          <TextField
              label="Título del blog"
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
            <TextField
              label="Categoría"
              variant="outlined"
              select
              sx={{
                minWidth: '200px',
                flexGrow: 1,
                borderRadius: '24px',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                },
              }}
            >
              <MenuItem value="Categoría 1">Categoría 1</MenuItem>
              <MenuItem value="Categoría 2">Categoría 2</MenuItem>
            </TextField>
          <TextField
            label="Descripción"
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
          <TextField
            label="Contenido del blog"
            variant="outlined"
            multiline
            rows={6}
            sx={{
              borderRadius: '24px',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            Galería de imágenes
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            {uploadFields.map((field, index) => (
              <UploadButton key={index} />
            ))}
            <IconButton onClick={handleAddUploadField} sx={{ fontSize: 40 }}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
            Guardar
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
              Blogs
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
                  <TableCell style={{ textAlign: 'center', width: '25%' }}>Blog</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Calificación</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Personas</TableCell>
                  <TableCell style={{ textAlign: 'center', width: '30%' }}>Descripción</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={row.image} alt={row.name} sx={{ width: 56, height: 56, marginRight: '8px' }} />
                        <Box>
                          <Typography variant="body1" fontWeight="bold">{row.name}</Typography>
                          <Typography variant="body2" sx={{ backgroundColor: '#F8BBD0', borderRadius: '12px', padding: '4px 8px', display: 'inline-block', color: 'white', fontWeight: 'bold' }}>
                            {row.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <StarIcon sx={{ color: 'black' }} /> {row.rating}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      {row.persons}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', whiteSpace: 'normal', wordWrap: 'break-word', width: '20%' }}>
                      {row.descripcion}
                    </TableCell>
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

          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Editar Blog</DialogTitle>
            <DialogContent>
              <TextField
                label="Título"
                name="titulo"
                value={currentBlog?.titulo || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Descripción"
                name="descripcion"
                value={currentBlog?.descripcion || ''}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Contenido"
                name="contenido"
                value={currentBlog?.contenido || ''}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={6}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleEditSave} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default CatalogoTable;