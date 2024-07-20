import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, IconButton, Button, TextField, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import getQuestionsWithAnswers from '../../supabase/CuestionarioServices/getQuestionsWithAnswers';
import updateQuestionWithAnswers from '../../supabase/CuestionarioServices/updateQuestionWithAnswers';
import createQuestionWithAnswers from '../../supabase/CuestionarioServices/createQuestionWithAnswers';
import deleteQuestionWithAnswers from '../../supabase/CuestionarioServices/deleteQuestionWithAnswers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';
import deleteAnswer from '../../supabase/CuestionarioServices/deleteAnswer';
import AddIcon from '@mui/icons-material/Add';

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
  const [deletedAnswers, setDeletedAnswers] = useState<Answer[]>([]);

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
    setEditingQuestion({
      id: 0, // 0 indicates that this is a new question
      pregunta: '',
      answers: []
    });
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
    setDeletedAnswers([]);
  };

  const handleEditClick = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editingQuestion) {
      if (editingQuestion.id === 0) {
        await createQuestionWithAnswers(editingQuestion);
      } else {
        await updateQuestionWithAnswers(editingQuestion, deletedAnswers);
      }
      setShowForm(false);
      setEditingQuestion(null);
      setDeletedAnswers([]);
      const data = await getQuestionsWithAnswers();
      setQuestions(data);
    }
  };

  const handleDelete = async (questionId: number) => {
    await deleteQuestionWithAnswers(questionId);
    const data = await getQuestionsWithAnswers();
    setQuestions(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
    if (editingQuestion) {
      const updatedAnswers = editingQuestion.answers.map((answer, idx) => (
        idx === index ? { ...answer, [field]: e.target.value } : answer
      ));
      setEditingQuestion({ ...editingQuestion, answers: updatedAnswers });
    }
  };

  const handleAddAnswer = () => {
    if (editingQuestion) {
      const newAnswer: Answer = {
        id: 0, // 0 indicates that this is a new answer
        respuesta: '',
        identificador: '',
        id_estilo: 0,
        id_pregunta: editingQuestion.id
      };
      setEditingQuestion({ ...editingQuestion, answers: [...editingQuestion.answers, newAnswer] });
    }
  };

  const handleDeleteAnswer = (index: number) => {
    if (editingQuestion) {
      const answerToDelete = editingQuestion.answers[index];
      if (answerToDelete.id !== 0) {
        setDeletedAnswers([...deletedAnswers, answerToDelete]);
      }
      const updatedAnswers = editingQuestion.answers.filter((_, idx) => idx !== index);
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
            {editingQuestion?.id === 0 ? 'Agregar Pregunta' : 'Editar Pregunta'}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Respuestas
            </Typography>
            <IconButton onClick={handleAddAnswer} sx={{ 
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={1}>
                  <IconButton onClick={() => handleDeleteAnswer(index)} sx={{ 
    mt: 2,  
    color: '#E61F93', 
    width: 38, 
    height: 38, 
    borderRadius: '50%', 
    '&:hover': {
      backgroundColor: 'white',
    } 
  }}>
    <DeleteIcon />
  </IconButton>
                  
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', marginTop: 2 }}>
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
                    <Avatar sx={{ bgcolor: '#FDD835', fontWeight: 'bold' }}>{index + 1}</Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      {index + 1} {question.pregunta}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleEditClick(question)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(question.id)}>
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
