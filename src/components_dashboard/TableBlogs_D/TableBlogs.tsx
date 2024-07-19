import React, { useState, useEffect } from 'react';
import getBlogs from '../../supabase/BlogServices/getBlogs';
import getBlogImages from '../../supabase/BlogServices/getBlogImages';
import updateBlog from '../../supabase/BlogServices/updateBlog';
import createBlog from '../../supabase/BlogServices/createBlog';
import deleteBlogImage from '../../supabase/BlogServices/deleteBlogImage';
import postBlogImages from '../../supabase/BlogServices/postBlogImages';
import deleteBlog from '../../supabase/BlogServices/deleteBlog';
import deleteBlogFolder from '../../supabase/BlogServices/deleteBlogFolder';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, IconButton, TablePagination, Typography, Button, TextField, MenuItem,
} from '@mui/material';
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
  id_categoria: number;
  images: string[];
}

interface ImageFileWithPreview {
  file: File;
  preview: string;
}

const CatalogoTable: React.FC = () => {
  const [rows, setRows] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [uploadFields, setUploadFields] = useState([0]);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [imageFiles, setImageFiles] = useState<ImageFileWithPreview[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogs();
        const formattedData = data.map((blog) => ({
          ...blog,
          name: blog.titulo,
          category: blog.categoria,
          rating: 5,
          persons: 100,
          images: []
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

  const handleShowForm = async (blog?: Blog) => {
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
  };

  const handleHideForm = () => {
    setShowForm(false);
    setCurrentBlog(null);
    setImageFiles([]);
    setDeletedImages([]);
  };

  const handleAddUploadField = () => {
    setUploadFields([...uploadFields, uploadFields.length]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedFiles = [...imageFiles];
      const preview = URL.createObjectURL(file);
      updatedFiles[index] = { file, preview };
      setImageFiles(updatedFiles);
    }
  };

  const handleDeleteImage = async (imagePath: string) => {
    const imageName = imagePath.split('/').pop();
    const bucketPath = `uploads/${currentBlog!.id}/${imageName}`;
    const success = await deleteBlogImage(bucketPath);
    if (success && currentBlog) {
      setDeletedImages([...deletedImages, imagePath]);
      setCurrentBlog((prevBlog) => ({
        ...prevBlog!,
        images: prevBlog!.images!.filter((image) => image !== imagePath)
      }));
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    const success = await deleteBlog(blogId);
    const folderDeleted = await deleteBlogFolder(blogId);

    if (success && folderDeleted) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== blogId));
    } else {
      console.error('There was an error deleting the blog or its folder!');
    }
  };

  const handleSave = async () => {
    if (currentBlog) {
      try {
        let updatedImages = [...currentBlog.images!];
        if (imageFiles.length > 0) {
          const newImages = await postBlogImages(currentBlog.id!, imageFiles.map(({ file }) => file));
          updatedImages = [...updatedImages, ...newImages];
        }

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
          }
        }
        handleHideForm();
      } catch (error) {
        console.error('There was an error saving the blog!', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentBlog((prevBlog) =>
      prevBlog ? { ...prevBlog, [name]: value } : { [name]: value }
    );
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
          }}
        >
          Subir
          <input
            type="file"
            hidden
            onChange={(e) => handleFileChange(e, index)}
          />
        </Button>
      </Box>
    ) : null
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
              },
            }}
          >
            <MenuItem value={1}>Ropa</MenuItem>
            <MenuItem value={2}>Eventos</MenuItem>
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
              },
            }}
          />
          <TextField
            label="Contenido del blog"
            name="contenido"
            variant="outlined"
            multiline
            rows={6}
            value={currentBlog?.contenido || ''}
            onChange={handleInputChange}
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
            {currentBlog?.images?.map((image, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <Avatar src={image} alt={`image-${index}`} sx={{ width: 150, height: 100 }} />
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => handleDeleteImage(image)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {imageFiles.map((imageFile, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <Avatar src={imageFile.preview} alt={`new-image-${index}`} sx={{ width: 150, height: 100 }} />
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== index))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {uploadFields.map((field, index) => (
              <UploadButton key={index} index={index} />
            ))}
            <IconButton onClick={handleAddUploadField} sx={{ fontSize: 40 }}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#E61F93',
              borderRadius: '24px',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)'
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
              <Button variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
                Reporte
              </Button>
              <Button onClick={() => handleShowForm()} variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto' }}>
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
                      <IconButton onClick={() => handleShowForm(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteBlog(row.id)}>
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
