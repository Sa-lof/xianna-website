import React from 'react';
import { Box, Button, TextField, Typography, IconButton, FormControl, FormLabel } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CatalogFormProps {
  onClose: () => void;
}

const CatalogForm: React.FC<CatalogFormProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, minWidth: 1250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Catálogo
        </Typography>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <FormControl sx={{ gridColumn: 'span 2' }}>
          <TextField
            fullWidth
            label="Nombre del outfit"
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
        </FormControl>
        <TextField
          fullWidth
          label="Estilo"
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
          <option value="">Estilo</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
        </TextField>
        <TextField
          fullWidth
          label="Ocasión"
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
          <option value="">Ocasión</option>
          <option value="Fiesta">Fiesta</option>
          <option value="Trabajo">Trabajo</option>
        </TextField>
        <TextField
          fullWidth
          label="Descripción del outfit"
          multiline
          rows={4}
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
          <Typography variant="subtitle1">Imagen principal</Typography>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2', mt: 2 }}>
          <Typography variant="subtitle1">Prendas</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Button
              sx={{
                minWidth: 100,
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
            <TextField
              fullWidth
              label="Nombre de la prenda"
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
              label="Link de búsqueda"
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
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <Button
              sx={{
                minWidth: 100,
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
            <TextField
              fullWidth
              label="Nombre de la prenda"
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
              label="Link de búsqueda"
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CatalogForm;
