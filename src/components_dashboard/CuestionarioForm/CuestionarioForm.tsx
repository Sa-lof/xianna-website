import React from 'react';
import { Box, Button, TextField, Typography, IconButton, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface QuestionnaireFormProps {
  onClose: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, minWidth: 1250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Formulario
        </Typography>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        <TextField
          fullWidth
          label="Pregunta"
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
        <Box sx={{ gridColumn: 'span 2' }}>
          <Typography variant="h6">Respuestas</Typography>
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Indicador</InputLabel>
                <Select
                  label="Indicador"
                  defaultValue=""
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
                  <MenuItem value="a">a</MenuItem>
                  <MenuItem value="b">b</MenuItem>
                  <MenuItem value="c">c</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={`Respuesta ${index + 1}`}
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
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Estilo</InputLabel>
                <Select
                  label="Estilo"
                  defaultValue=""
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
                  <MenuItem value="Estilo 1">Estilo 1</MenuItem>
                  <MenuItem value="Estilo 2">Estilo 2</MenuItem>
                  <MenuItem value="Estilo 3">Estilo 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionnaireForm;
