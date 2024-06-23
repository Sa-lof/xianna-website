import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import UserCard from '../UserCard/UserCard';

interface Column {
  id: 'Imagen' | 'Nombre' | 'Estilo';
  label: string;
  minWidth?: number;
  align?: 'left';
}

const columns: readonly Column[] = [
  { id: 'Imagen', label: '', minWidth: 80, align: 'left' },
  { id: 'Nombre', label: '', minWidth: 200, align: 'left' },
  { id: 'Estilo', label: '', minWidth: 200, align: 'left' },
];

interface Data {
  Imagen: string;
  Nombre: string;
  Estilo: string;
  Correo: string;
  Ciudad: string;
  Profesion: string;
  Edad: number;
  TipoDeCuerpo: string;
  Talla: string;
}

function createData(
  Imagen: string, Nombre: string, Estilo: string, Correo: string, Ciudad: string, Profesion: string, Edad: number, TipoDeCuerpo: string, Talla: string
): Data {
  return { Imagen, Nombre, Estilo, Correo, Ciudad, Profesion, Edad, TipoDeCuerpo, Talla };
}

const rows = [
  createData('image1.jpg', 'Nombre usuario', 'Tipo de estilo', 'correo1@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario2', 'Tipo de estilo', 'correo2@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario3', 'Tipo de estilo', 'correo3@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario4', 'Tipo de estilo', 'correo4@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario', 'Tipo de estilo', 'correo5@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario2', 'Tipo de estilo', 'correo6@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario3', 'Tipo de estilo', 'correo7@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario4', 'Tipo de estilo', 'correo8@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario', 'Tipo de estilo', 'correo9@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario2', 'Tipo de estilo', 'correo10@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario3', 'Tipo de estilo', 'correo11@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
  createData('image1.jpg', 'Nombre usuario4', 'Tipo de estilo', 'correo12@correo.com', 'Ciudad de México', 'Abogado', 44, 'Rectángulo', 'Mediana'),
];

export default function CustomTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState<Data | null>(rows[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (user: Data) => {
    setSelectedUser(user);
  };

  React.useEffect(() => {
    setSelectedUser(rows[0]);
  }, []);

  return (
    <Box display="flex">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="custom table">
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    backgroundColor: selectedUser?.Correo === row.Correo ? '#FAACC1' : 'inherit',
                    borderRadius: '10px',
                    color: selectedUser?.Correo === row.Correo ? 'white' : 'inherit',
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          borderBottom: 'none',
                          padding: '10px 16px',
                          color: selectedUser?.Correo === row.Correo ? 'white' : 'inherit',
                        }}
                      >
                        {column.id === 'Imagen' ? (
                          <Box display="flex" justifyContent="center">
                            <Avatar alt={row.Nombre} src={typeof value === 'string' ? value : undefined} sx={{ width: 56, height: 56 }} />
                          </Box>
                        ) : (
                          <Box display="flex" flexDirection="column" justifyContent="center">
                            <Box component="span" sx={{ fontWeight: column.id === 'Nombre' ? 'bold' : 'normal' }}>
                              {value}
                            </Box>
                            {column.id === 'Estilo' && (
                              <Box component="span" sx={{ color: selectedUser?.Correo === row.Correo ? 'white' : 'gray', marginTop: '4px' }}>
                                {value}
                              </Box>
                            )}
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
      {selectedUser && (
        <Box ml={2}>
          <UserCard user={selectedUser} />
        </Box>
      )}
    </Box>
  );
}
