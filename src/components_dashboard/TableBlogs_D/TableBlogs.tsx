import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, IconButton, TablePagination, Typography, Button, TextField, MenuItem,
  Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { Blog, ImageFileWithPreview } from "../../supabase/BlogServices/types";
import getBlogs from '../../supabase/BlogServices/getBlogs';
import getBlogImages from '../../supabase/BlogServices/getBlogImages';
import updateBlog from '../../supabase/BlogServices/updateBlog';
import createBlog from '../../supabase/BlogServices/createBlog';
import deleteBlogImage from '../../supabase/BlogServices/deleteBlogImage';
import postBlogImages from '../../supabase/BlogServices/postBlogImages';
import deleteBlog from '../../supabase/BlogServices/deleteBlog';
import deleteBlogFolder from '../../supabase/BlogServices/deleteBlogFolder';
import getCategorias from '../../supabase/BlogServices/getCategorias';
import * as XLSX from 'xlsx';
import Loader from '../../../src/components/Loader/Loader'; // Importa el Loader
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [uploadFields, setUploadFields] = useState<number[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [imageFiles, setImageFiles] = useState<ImageFileWithPreview[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<{ id: number, categoria: string }[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Agrega estado de carga

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setRows(data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogs, categoriasData] = await Promise.all([getBlogs(), getCategorias()]);
        setRows(blogs);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      } finally {
        setLoading(false);
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

  const handleShowForm = async (blog?: Blog) => {
    try {
      setLoading(true);
      if (blog) {
        const images = await getBlogImages(blog.id);
        setCurrentBlog({ ...blog, images });
      } else {
        setCurrentBlog({
          titulo: '',
          descripcion: '',
          contenido: '',
          id_categoria: 0,
          image: '',
          name: '',
          category: '',
          rating: 0,
          persons: 0,
          images: []
        });
      }
      setShowForm(true);
    } catch (error) {
      console.error('There was an error showing the form!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHideForm = () => {
    setShowForm(false);
    setCurrentBlog(null);
    setImageFiles([]);
    setDeletedImages([]);
    setUploadFields([]);
  };

  const handleAddUploadField = () => {
    setUploadFields([...uploadFields, uploadFields.length]);
  };

  const handleRemoveUploadField = (index: number) => {
    setUploadFields(uploadFields.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      // Eliminar espacios y reemplazar caracteres especiales por guiones bajos
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      
      // Crear un nuevo archivo con el nombre sanitizado
      const newFile = new File([file], sanitizedFileName, { type: file.type });
  
      const updatedFiles = [...imageFiles];
      const preview = URL.createObjectURL(newFile);
      updatedFiles[index] = { file: newFile, preview };
      setImageFiles(updatedFiles);
    }
  };   

  const handleDeleteImage = (imagePath: string) => {
    setDeletedImages([...deletedImages, imagePath]);
    setCurrentBlog((prevBlog) => ({
      ...prevBlog!,
      images: prevBlog!.images!.filter((image) => image !== imagePath),
    }));
  };

  const handleDeleteBlog = async () => {
    setLoading(true);
    try {
      if (selectedBlogId !== null) {
        const success = await deleteBlog(selectedBlogId);
        const folderDeleted = await deleteBlogFolder(selectedBlogId);
  
        if (success && folderDeleted) {
          setRows((prevRows) => prevRows.filter((row) => row.id !== selectedBlogId));
          setToastMessage('Blog borrado con éxito.');
          setToastSeverity('success');
        } else {
          setToastMessage('Hubo un error al eliminar el blog o sus calificaciones.');
          setToastSeverity('error');
          console.error('There was an error deleting the blog or its folder!');
        }
        setToastOpen(true);
      }
      setConfirmDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!currentBlog) return false;
    if (!currentBlog.titulo || !currentBlog.id_categoria || !currentBlog.descripcion || !currentBlog.contenido) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setToastMessage('Por favor, completa todos los campos.');
      setToastSeverity('warning');
      setToastOpen(true);
      return;
    }
  
    setLoading(true);
    try {
      if (currentBlog) {
        let updatedImages = [...currentBlog.images!];
        
        // Sube nuevas imágenes si las hay
        if (imageFiles.length > 0) {
          const newImages = await postBlogImages(currentBlog.id!, imageFiles.map(({ file }) => file));
          updatedImages = [...updatedImages, ...newImages];
        }
  
        // Elimina las imágenes marcadas para eliminación
        if (deletedImages.length > 0) {
          await Promise.all(
            deletedImages.map(async (imagePath) => {
              const imageName = encodeURIComponent(imagePath.split('/').pop()!);
              const bucketPath = `uploads/${currentBlog!.id}/${imageName}`;
              await deleteBlogImage(bucketPath);
            })
          );
        }
  
        // Actualiza o crea el blog
        if (currentBlog.id) {
          await updateBlog(currentBlog.id, {
            titulo: currentBlog.titulo!,
            descripcion: currentBlog.descripcion!,
            contenido: currentBlog.contenido!,
            id_categoria: currentBlog.id_categoria!
          });
  
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === currentBlog.id ? { ...currentBlog, images: updatedImages } as Blog : row
            )
          );
          setToastMessage('Blog actualizado con éxito.');
          setToastSeverity('success');
          setToastOpen(true);
        } else {
          const newBlog = await createBlog({
            titulo: currentBlog.titulo!,
            descripcion: currentBlog.descripcion!,
            contenido: currentBlog.contenido!,
            id_categoria: currentBlog.id_categoria!,
            images: imageFiles.map(({ file }) => file)
          });
          if (newBlog) {
            const formattedNewBlog = {
              ...newBlog,
              id: newBlog.id,
              image: newBlog.images.length > 0 ? newBlog.images[0] : 'https://via.placeholder.com/150',
              name: newBlog.titulo,
              category: 'Categoría',
              rating: 5,
              persons: 100,
              images: newBlog.images
            };
            setRows((prevRows) => [...prevRows, formattedNewBlog]);
            setToastMessage('Blog creado con éxito.');
            setToastSeverity('success');
            setToastOpen(true);
          }
        }
        handleHideForm();
        await fetchBlogs();
      }
    } catch (error) {
      setToastMessage('Hubo un error al guardar el blog.');
      setToastSeverity('error');
      setToastOpen(true);
      console.error('There was an error saving the blog!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentBlog((prevBlog) =>
      prevBlog ? { ...prevBlog, [name]: value } : { [name]: value }
    );
  };

  const handleDownloadExcel = () => {
    const categoryMap = categorias.reduce((acc, category) => {
      acc[category.id] = category.categoria;
      return acc;
    }, {} as { [key: number]: string });

    const worksheet = XLSX.utils.json_to_sheet(rows.map((row) => ({
      Titulo: row.titulo,
      Categoria: categoryMap[row.id_categoria] || row.id_categoria,
      Descripcion: row.descripcion,
      Contenido: row.contenido,
      Calificacion: row.rating,
      Personas: row.persons
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Blogs");
    XLSX.writeFile(workbook, "blogs_report.xlsx");
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleOpenConfirmDialog = (blogId: number) => {
    setSelectedBlogId(blogId);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const UploadButton: React.FC<{ index: number }> = ({ index }) => (
    !imageFiles[index]?.file ? (
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
          position: 'relative'
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: 'black' }} />
        <Button
          variant="contained"
          component="label"
          sx={{
            marginTop: '8px',
            backgroundColor: '#E61F93',
            borderRadius: '20px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
              '& .MuiTypography-root': {
                color: 'white' // El texto se vuelve blanco en hover
              }
            },
          }}
        >
          Subir
          <input
            type="file"
            hidden
            onChange={(e) => handleFileChange(e, index)}
          />
        </Button>
        <IconButton
          onClick={() => handleRemoveUploadField(index)}
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            color: '#E61F93' 
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ) : null
  );

  const handleQuillChange = (value: string) => {
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        contenido: value,
      });
    } else {
      setCurrentBlog({ contenido: value });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showForm ? (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button onClick={handleHideForm} variant="contained" sx={{borderRadius: '20px', alignSelf: 'flex-end', backgroundColor: '#E61F93', flex: '0 1 auto', '&:hover': {
                  bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                  '& .MuiTypography-root': {
                    color: 'white' // El texto se vuelve blanco en hover
                  }
                }, }}>
                Regresar
              </Button>
              <Typography variant="h4" fontWeight="bold">
                Blogs
              </Typography>
              <TextField
  label="Título del blog"
  name="titulo"
  variant="outlined"
  fullWidth
  value={currentBlog?.titulo || ''}
  onChange={handleInputChange}
  sx={{
    borderRadius: '24px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      '& fieldset': {
        borderColor: 'transparent', // Sin borde
      },
      '&:hover fieldset': {
        borderColor: 'transparent', // Sin borde al hacer hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent', // Sin borde cuando se enfoca el input
      },
    },
  }}
/>
              <TextField
                label="Categoría"
                name="id_categoria"
                variant="outlined"
                select
                value={currentBlog?.id_categoria || ''}
                onChange={handleInputChange}
                sx={{
                  minWidth: '200px',
                  flexGrow: 1,
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    '& fieldset': {
                      borderColor: 'transparent', // Sin borde
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent', // Sin borde al hacer hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent', // Sin borde cuando se enfoca el input
                    },
                  },
                }}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>{categoria.categoria}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Descripción"
                name="descripcion"
                variant="outlined"
                multiline
                rows={4}
                value={currentBlog?.descripcion || ''}
                onChange={handleInputChange}
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    '& fieldset': {
                      borderColor: 'transparent', // Sin borde
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent', // Sin borde al hacer hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent', // Sin borde cuando se enfoca el input
                    },
                  },
                }}
              />
              <ReactQuill
                theme="snow"
                value={currentBlog?.contenido || ''}
                onChange={handleQuillChange}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link', 'blockquote', 'code-block'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'] // remove formatting button
                  ],
                }}
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                Galería de imágenes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                {currentBlog?.images?.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Avatar src={image} alt={`image-${index}`} sx={{ width: 150, height: 150, borderRadius: '12px' }} />
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, color:'#E61F93'}} onClick={() => handleDeleteImage(image)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                {imageFiles.map((imageFile, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Avatar src={imageFile.preview} alt={`new-image-${index}`} sx={{ width: 150, height: 150, borderRadius: '12px' }} />
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0, color:'#E61F93'}} onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== index))}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                {uploadFields.map((field, index) => (
                  <UploadButton key={index} index={index} />
                ))}
                <IconButton onClick={handleAddUploadField} sx={{ 
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
  
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: '#E61F93',
                  borderRadius: '24px',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                    '& .MuiTypography-root': {
                      color: 'white' // El texto se vuelve blanco en hover
                    }
                  }, 
                }}
              >
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
                <Button onClick={handleDownloadExcel} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 }, '&:hover': {
                  bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                  '& .MuiTypography-root': {
                    color: 'white' // El texto se vuelve blanco en hover
                  }
                }, }}>
                    Reporte
                  </Button>
                  <Button onClick={() => handleShowForm()} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto','&:hover': {
                  bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                  '& .MuiTypography-root': {
                    color: 'white' // El texto se vuelve blanco en hover
                  }
                }, }}>
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
                            <Avatar 
                              src={row.image} 
                              alt={row.name} 
                              sx={{ 
                                width: 56, 
                                height: 56, 
                                margin: '8px', 
                                borderRadius: '5px',
                              }} 
                            />
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
                          <IconButton onClick={() => handleShowForm(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenConfirmDialog(row.id)}>
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
          <Snackbar 
            open={toastOpen} 
            autoHideDuration={6000} 
            onClose={handleCloseToast} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseToast} severity={toastSeverity} sx={{ width: '100%' }}>
              {toastMessage}
            </Alert>
          </Snackbar>
  
          <Dialog
            open={confirmDialogOpen}
            onClose={handleCloseConfirmDialog}
          >
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este blog?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
  <Button 
    onClick={handleCloseConfirmDialog} 
    sx={{
      color: 'white', 
      borderRadius: '20px', 
      backgroundColor: '#E61F93', 
      flex: '0 1 auto', 
      marginBottom: { xs: 1, sm: 0 },
      fontSize: '0.8rem',  // Tamaño de la fuente más pequeño
      padding: '4px 16px',  // Ajustar el padding para hacerlo más compacto
      '&:hover': {
        backgroundColor: 'black'
      }
    }}
  >
    Cancelar
  </Button>
  <Button 
    onClick={handleDeleteBlog} 
    sx={{
      color: 'white', 
      borderRadius: '20px', 
      backgroundColor: '#E61F93', 
      flex: '0 1 auto', 
      marginBottom: { xs: 1, sm: 0 },
      fontSize: '0.8rem',  // Tamaño de la fuente más pequeño
      padding: '4px 16px',  // Ajustar el padding para hacerlo más compacto
      '&:hover': {
        backgroundColor: 'black'
      }
    }}
  >
    Eliminar
  </Button>
</DialogActions>


          </Dialog>
        </>
      )}
    </Box>
  );
};

export default CatalogoTable;
