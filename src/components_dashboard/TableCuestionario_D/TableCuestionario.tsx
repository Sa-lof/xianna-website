import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const questions = [
  {
    id: '01',
    question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
    answers: [
      { id: 'a', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'b', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'c', text: 'Opción de respuesta', type: 'Tipo de estilo' },
    ],
  },
  {
    id: '02',
    question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
    answers: [
      { id: 'a', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'b', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'c', text: 'Opción de respuesta', type: 'Tipo de estilo' },
    ],
  },
  {
    id: '03',
    question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
    answers: [
      { id: 'a', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'b', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      { id: 'c', text: 'Opción de respuesta', type: 'Tipo de estilo' },
    ],
  },
];

const QuestionAnswerAccordion: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button onClick={handleHideForm} variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#E61F93' }}>
            Regresar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Formulario
          </Typography>
          <TextField
            label="Pregunta"
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
          <Typography variant="h6" fontWeight="bold">
            Respuestas
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Identificador"
                    variant="outlined"
                    fullWidth
                    select
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                      },
                    }}
                  >
                    <MenuItem value={`id${i}`}>Identificador {i}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Respuesta"
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
                    label="Tipo de estilo"
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
              </React.Fragment>
            ))}
          </Grid>
          <Button variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
            Guardar
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
              Formulario
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
          {questions.map((question, index) => (
            <Accordion key={index} sx={{ marginBottom: 2, borderRadius: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar sx={{ bgcolor: '#FDD835', fontWeight: 'bold' }}>{question.id}</Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      {question.id}{question.question}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#FFEB3B', fontWeight: 'bold' }}>Identificador</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFEB3B', fontWeight: 'bold' }}>Respuesta</TableCell>
                        <TableCell sx={{ backgroundColor: '#FFEB3B', fontWeight: 'bold' }}>Tipo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {question.answers.map((answer, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{answer.id}</TableCell>
                          <TableCell>{answer.text}</TableCell>
                          <TableCell>{answer.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Box>
  );
};

export default QuestionAnswerAccordion;
