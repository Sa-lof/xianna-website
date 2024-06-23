import React from 'react';
import { Box, Button, TextField, Typography, IconButton, FormControl, MenuItem } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BlogFormProps {
  onClose: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, minWidth: 1250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Blogs
        </Typography>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <TextField
          fullWidth
          label="Título del blog"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              boxShadow: '0px 3px 6px #00000029',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#aaa',
            },
          }}
        />
        <TextField
          fullWidth
          label="Categoría"
          select
          SelectProps={{ native: false }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              boxShadow: '0px 3px 6px #00000029',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#aaa',
            },
          }}
        >
          <MenuItem value="">Seleccionar categoría</MenuItem>
          <MenuItem value="Tecnología">Tecnología</MenuItem>
          <MenuItem value="Salud">Salud</MenuItem>
          <MenuItem value="Estilo de vida">Estilo de vida</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Descripción"
          multiline
          rows={2}
          sx={{
            gridColumn: 'span 2',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              boxShadow: '0px 3px 6px #00000029',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#aaa',
            },
          }}
        />
        <TextField
          fullWidth
          label="Contenido del blog"
          multiline
          rows={6}
          sx={{
            gridColumn: 'span 2',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              boxShadow: '0px 3px 6px #00000029',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#aaa',
            },
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2', mt: 2 }}>
          <Typography variant="subtitle1">Imagen del blog</Typography>
          <Button
            sx={{
              minWidth: 100,
              mt: 1,
              backgroundColor: '#E61F93',
              borderRadius: '25px',
              color: 'white',
              '&:hover': {
                backgroundColor: '#C2185B',
              },
            }}
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
          >
            Subir
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogForm;
