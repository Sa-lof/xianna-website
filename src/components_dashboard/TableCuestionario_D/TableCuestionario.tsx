import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, IconButton, Button, TextField, MenuItem, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import getQuestionsWithAnswers from '../../supabase/CuestionarioServices/getQuestionsWithAnswers';
import updateQuestionWithAnswers from '../../supabase/CuestionarioServices/updateQuestionWithAnswers';
import createQuestionWithAnswers from '../../supabase/CuestionarioServices/createQuestionWithAnswers';
import deleteQuestionWithAnswers from '../../supabase/CuestionarioServices/deleteQuestionWithAnswers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';
import AddIcon from '@mui/icons-material/Add';
import { Answer, Question, Estilo } from '../../supabase/CuestionarioServices/types';
import * as XLSX from 'xlsx';
import Loader from '../../../src/components/Loader/Loader';

const QuestionAnswerAccordion: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [styles, setStyles] = useState<Estilo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deletedAnswers, setDeletedAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'warning'>('success');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const questionsData = await getQuestionsWithAnswers();
      setQuestions(questionsData);
      const stylesData = await getStyles();
      setStyles(stylesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleShowForm = () => {
    setEditingQuestion({
      id: 0,
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
    setLoading(true);
    setEditingQuestion(question);
    setShowForm(true);
    setLoading(false);
  };

  const validateForm = () => {
    if (!editingQuestion || !editingQuestion.pregunta) {
      setToastMessage('Por favor, completa el campo de la pregunta.');
      setToastSeverity('warning');
      setToastOpen(true);
      return false;
    }
    for (const answer of editingQuestion.answers) {
      if (!answer.identificador || !answer.respuesta || !answer.id_estilo) {
        setToastMessage('Por favor, completa todos los campos de las respuestas.');
        setToastSeverity('warning');
        setToastOpen(true);
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true); 
    try {
      if (editingQuestion) {
        if (editingQuestion.id === 0) {
          await createQuestionWithAnswers(editingQuestion);
          setToastMessage('Pregunta creada con éxito.');
          setToastSeverity('success');
        } else {
          await updateQuestionWithAnswers(editingQuestion, deletedAnswers);
          setToastMessage('Pregunta actualizada con éxito.');
          setToastSeverity('success');
        }
        setShowForm(false);
        setEditingQuestion(null);
        setDeletedAnswers([]);
        const data = await getQuestionsWithAnswers();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error saving question:", error);
      setToastMessage('Hubo un error al guardar la pregunta.');
      setToastSeverity('error');
    }
    setToastOpen(true);
    setLoading(false); 
  };

  const handleDelete = async () => {
    if (questionToDelete !== null) {
      setLoading(true);
      try {
        await deleteQuestionWithAnswers(questionToDelete);
        const data = await getQuestionsWithAnswers();
        setQuestions(data);
        setToastMessage('Pregunta eliminada con éxito.');
        setToastSeverity('success');
      } catch (error) {
        console.error('Error deleting question:', error);
        setToastMessage('Hubo un error al eliminar la pregunta.');
        setToastSeverity('error');
      }
      setLoading(false);
    }
    setToastOpen(true);
    setQuestionToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleOpenConfirmDialog = (questionId: number) => {
    setQuestionToDelete(questionId);
    setConfirmDialogOpen(true);
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
        id: 0,
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

  const handleDownloadExcel = () => {
    const styleMap = styles.reduce((acc, style) => {
      acc[style.id] = style.tipo;
      return acc;
    }, {} as { [key: number]: string });

    const data: any[][] = [['Pregunta', 'Identificador', 'Respuesta', 'Estilo']];
    questions.forEach((question) => {
      const questionRows = question.answers.map((answer, index) => [
        index === 0 ? question.pregunta : '',
        answer.identificador,
        answer.respuesta,
        styleMap[answer.id_estilo] || answer.id_estilo
      ]);
      data.push(...questionRows);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    let rowIndex = 1;
    questions.forEach((question) => {
      if (question.answers.length > 1) {
        worksheet['!merges'] = worksheet['!merges'] || [];
        worksheet['!merges'].push({
          s: { r: rowIndex, c: 0 },
          e: { r: rowIndex + question.answers.length - 1, c: 0 }
        });
      }
      rowIndex += question.answers.length;
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Preguntas y Respuestas');
    XLSX.writeFile(workbook, 'questions_report.xlsx');
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showForm ? (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button onClick={handleHideForm} variant="contained" sx={{ borderRadius: '20px', alignSelf: 'flex-end', backgroundColor: '#E61F93', marginTop: { xs: 1, sm: 0 }, '&:hover': {
            bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
            '& .MuiTypography-root': {
              color: 'white' // El texto se vuelve blanco en hover
            }
          }, }}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Respuestas
                </Typography>
                <IconButton
                  onClick={handleAddAnswer}
                  sx={{
                    mt: 2,
                    backgroundColor: '#E61F93',
                    color: 'white',
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                  }}
                >
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
                        <MenuItem value="a">Identificador A</MenuItem>
                        <MenuItem value="b">Identificador B</MenuItem>
                        <MenuItem value="c">Identificador C</MenuItem>
                        <MenuItem value="d">Identificador D</MenuItem>
                        <MenuItem value="e">Identificador E</MenuItem>
                        <MenuItem value="f">Identificador F</MenuItem>
                        <MenuItem value="g">Identificador G</MenuItem>
                        <MenuItem value="h">Identificador H</MenuItem>
                        <MenuItem value="i">Identificador I</MenuItem>
                        <MenuItem value="j">Identificador J</MenuItem>
                        <MenuItem value="k">Identificador K</MenuItem>
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
                        {styles.map((style) => (
                          <MenuItem key={style.id} value={style.id}>
                            {style.tipo}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton
                        onClick={() => handleDeleteAnswer(index)}
                        sx={{
                          mt: 2,
                          color: '#E61F93',
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          '&:hover': {
                            backgroundColor: 'white',
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ backgroundColor: '#E61F93', borderRadius: '24px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', marginTop: 2, '&:hover': {
                  bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                  '& .MuiTypography-root': {
                    color: 'white' // El texto se vuelve blanco en hover
                  }
                }, }}
              >
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
                  <Button
                    onClick={handleDownloadExcel}
                    variant="contained"
                    sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 }, '&:hover': {
                      bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                      '& .MuiTypography-root': {
                        color: 'white' // El texto se vuelve blanco en hover
                      }
                    },}}
                  >
                    Reporte
                  </Button>
                  <Button
                    onClick={handleShowForm}
                    variant="contained"
                    sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', '&:hover': {
                      bgcolor: 'black', // Cambia a negro cuando se pasa el cursor
                      '& .MuiTypography-root': {
                        color: 'white' // El texto se vuelve blanco en hover
                      }
                    },}}
                  >
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
                        <IconButton onClick={() => handleOpenConfirmDialog(question.id)}>
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
                              <TableCell>{styles.find(style => style.id === answer.id_estilo)?.tipo || answer.id_estilo}</TableCell>
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
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta pregunta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} sx={{color:'white', borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} sx={{color:'white', borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionAnswerAccordion;
