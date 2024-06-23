import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

interface Column {
  id: 'Imagen' | 'Nombre' | 'Calificación' | 'Personas' | 'Descripción' | 'Acciones';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Imagen', label: 'Blog', minWidth: 290, align: 'left' },
  { id: 'Calificación', label: 'Calificación', minWidth: 150, align: 'center' },
  { id: 'Personas', label: 'Personas', minWidth: 200, align: 'center' },
  { id: 'Descripción', label: 'Descripción', minWidth: 300, align: 'left' },
  { id: 'Acciones', label: 'Acciones', minWidth: 200, align: 'center' },
];

interface Data {
  Imagen: string;
  Nombre: string;
  Calificación: number;
  Personas: number;
  Descripción: string;
  Acciones: string;
}

function createData(
  Imagen: string,
  Nombre: string,
  Calificación: number,
  Personas: number,
  Descripción: string
): Data {
  return { Imagen, Nombre, Calificación, Personas, Descripción, Acciones: '' };
}

const rows = [
  createData('image1.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
  createData('image2.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
  createData('image3.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
  createData('image4.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
  createData('image5.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
  createData('image6.jpg', 'Título del blog', 5, 100, 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#F9A7B0', color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.Nombre}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'Imagen' ? (
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <Avatar alt={row.Nombre} src={typeof value === 'string' ? value : undefined} />
                            <Box ml={2} textAlign="center">
                              <div>{row.Nombre}</div>
                              <Chip label="Categoría" style={{ backgroundColor: '#F9A7B0', color: 'white' }} />
                            </Box>
                          </Box>
                        ) : column.id === 'Calificación' ? (
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <StarIcon style={{ color: 'black' }} />
                            {value}
                          </Box>
                        ) : column.id === 'Acciones' ? (
                          <Box display="flex" justifyContent="center">
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box textAlign="center">{value}</Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
