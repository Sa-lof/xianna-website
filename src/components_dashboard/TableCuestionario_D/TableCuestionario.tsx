import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, IconButton, Button, TextField, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import getQuestionsWithAnswers from '../../supabase/CuestionarioServices/getQuestionsWithAnswers';
import updateQuestionWithAnswers from '../../supabase/CuestionarioServices/updateQuestionWithAnswers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';

interface Answer {
  id: number;
  respuesta: string;
  identificador: string;
  id_estilo: number;
  id_pregunta: number;
}

interface Question {
  id: number;
  pregunta: string;
  answers: Answer[];
}

interface Estilo {
  id: number;
  tipo: string;
  descripcion: string;
}

const QuestionAnswerAccordion: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [styles, setStyles] = useState<Estilo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuestionsWithAnswers();
      setQuestions(questionsData);
      const stylesData = await getStyles();
      setStyles(stylesData);
    };
    fetchData();
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  const handleEditClick = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editingQuestion) {
      await updateQuestionWithAnswers(editingQuestion);
      setShowForm(false);
      setEditingQuestion(null);
      const data = await getQuestionsWithAnswers();
      setQuestions(data);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
    if (editingQuestion) {
      const updatedAnswers = editingQuestion.answers.map((answer, idx) => (
        idx === index ? { ...answer, [field]: e.target.value } : answer
      ));
      setEditingQuestion({ ...editingQuestion, answers: updatedAnswers });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {showForm ? (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button onClick={handleHideForm} variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#E61F93' }}>
            Regresar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            {editingQuestion ? 'Editar Pregunta' : 'Agregar Pregunta'}
          </Typography>
          <TextField
            label="Pregunta"
            variant="outlined"
            fullWidth
            value={editingQuestion?.pregunta || ''}
            onChange={(e) => setEditingQuestion(editingQuestion ? { ...editingQuestion, pregunta: e.target.value } : null)}
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
            {editingQuestion?.answers.map((answer, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Identificador"
                    variant="outlined"
                    fullWidth
                    select
                    value={answer.identificador}
                    onChange={(e) => handleInputChange(e, index, 'identificador')}
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                      },
                    }}
                  >
                    <MenuItem value="a">Identificador A</MenuItem>
                    <MenuItem value="b">Identificador B</MenuItem>
                    <MenuItem value="c">Identificador C</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Respuesta"
                    variant="outlined"
                    fullWidth
                    value={answer.respuesta}
                    onChange={(e) => handleInputChange(e, index, 'respuesta')}
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
                    select
                    value={answer.id_estilo}
                    onChange={(e) => handleInputChange(e, index, 'id_estilo')}
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
              </React.Fragment>
            ))}
          </Grid>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
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
                      {question.id} {question.pregunta}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleEditClick(question)}>
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
                          <TableCell>{answer.identificador}</TableCell>
                          <TableCell>{answer.respuesta}</TableCell>
                          <TableCell>{answer.id_estilo}</TableCell>
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
