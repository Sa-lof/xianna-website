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

interface Column {
  id: 'Imagen' | 'Nombre' | 'Estilo' | 'Ocasiones' | 'Favoritos' | 'Acciones';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Imagen', label: 'Imagen', minWidth: 200, align: 'center' },
  { id: 'Nombre', label: 'Nombre', minWidth: 200, align: 'center' },
  { id: 'Estilo', label: 'Estilo', minWidth: 200, align: 'center' },
  { id: 'Ocasiones', label: 'Ocasiones', minWidth: 200, align: 'center' },
  { id: 'Favoritos', label: 'Favoritos', minWidth: 200, align: 'center' },
  { id: 'Acciones', label: 'Acciones', minWidth: 200, align: 'center' },
];

interface Data {
  Imagen: string;
  Nombre: string;
  Estilo: string;
  Ocasiones: string[];
  Favoritos: number;
  Acciones: string;
}

function createData(
  Imagen: string,
  Nombre: string,
  Estilo: string,
  Ocasiones: string,
  Favoritos: number,
): Data {
  return { Imagen, Nombre, Estilo, Ocasiones: Ocasiones.split(', '), Favoritos, Acciones: '' };
}

const rows = [
  createData('image1.jpg', 'Producto 1', 'Casual', 'Diario, Fiesta', 4.5),
  createData('image2.jpg', 'Producto 2', 'Formal', 'Trabajo, Evento', 3.8),
  createData('image3.jpg', 'Producto 3', 'Deportivo', 'Entrenamiento, Viaje', 4.2),
  createData('image4.jpg', 'Producto 4', 'Elegante', 'Fiesta, Boda', 4.9),
  createData('image5.jpg', 'Producto 5', 'Vintage', 'Casual, Diario', 3.7),
  createData('image6.jpg', 'Producto 6', 'Bohemio', 'Playa, Casual', 4.1),
  createData('image7.jpg', 'Producto 7', 'Moderno', 'Trabajo, Casual', 4.3),
  createData('image8.jpg', 'Producto 8', 'Clásico', 'Evento, Formal', 3.9),
  createData('image9.jpg', 'Producto 9', 'Romántico', 'Cena, Fiesta', 4.4),
  createData('image10.jpg', 'Producto 10', 'Minimalista', 'Diario, Trabajo', 4.0),
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
                  style={{ minWidth: column.minWidth, backgroundColor: '#00D1ED', color: 'white', textAlign: 'center', fontWeight: 'bold'}}
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
                      <TableCell key={column.id} align="center">
                        {column.id === 'Imagen' ? (
                          <Box display="flex" justifyContent="center">
                            <Avatar alt={row.Nombre} src={typeof value === 'string' ? value : undefined} />
                          </Box>
                        ) : column.id === 'Estilo' ? (
                          <Chip label={value} style={{ backgroundColor: '#00D1ED', color: 'white'}} />
                        ) : column.id === 'Ocasiones' ? (
                          <Box display="flex" flexDirection="column" alignItems="center">
                            {(value as string[]).map((ocasion) => (
                              <Chip key={ocasion} label={ocasion} style={{ backgroundColor: '#00D1ED', color: 'white', marginTop: 4}} />
                            ))}
                          </Box>
                        ) : column.id === 'Acciones' ? (
                          <>
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          value
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
