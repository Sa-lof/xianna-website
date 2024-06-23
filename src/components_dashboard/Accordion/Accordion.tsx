import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function CustomAccordion() {
  const questions = [
    {
      id: '01',
      question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
      answers: [
        { id: 'a', text: 'Opción de respuesta', type: 'Tipo de estilo' },
        { id: 'b', text: 'Opción de respuesta', type: 'Tipo de estilo' },
        { id: 'c', text: 'Opción de respuesta', type: 'Tipo de estilo' },
      ],
    },
    {
      id: '02',
      question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
      answers: [],
    },
    {
      id: '03',
      question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
      answers: [],
    },
    {
      id: '04',
      question: '¿Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum?',
      answers: [],
    },
  ];

  return (
    <div>
      {questions.map((q, index) => (
        <Box mb={2} key={index}>
          <Accordion defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
              sx={{ minWidth: '1200px', display: 'flex', alignItems: 'center' }}
            >
              <Typography sx={{ flexGrow: 1 }}>
                <Typography component="span" fontWeight="bold" color={'#FDE12D'}>{q.id}</Typography> {q.question}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small"><EditIcon /></IconButton>
                <IconButton size="small"><DeleteIcon /></IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {q.answers.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: '#FDE12D', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Identificador</TableCell>
                        <TableCell style={{ backgroundColor: '#FDE12D', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Respuesta</TableCell>
                        <TableCell style={{ backgroundColor: '#FDE12D', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Tipo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {q.answers.map((answer, i) => (
                        <TableRow key={i}>
                          <TableCell style={{ textAlign: 'center' }}>{answer.id}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{answer.text}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{answer.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No answers available.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </div>
  );
}
