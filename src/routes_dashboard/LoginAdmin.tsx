import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import supabase from '../supabaseClient';
import { Box, Snackbar, Alert } from '@mui/material';
import logo from "../assets/logo/xianna.png";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#E61F93',
          },
          '&:hover fieldset': {
            borderColor: '#E61F93',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#E61F93',
          },
        },
        input: {
          '&::placeholder': {
            color: '#E61F93',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#E61F93',
          '&.Mui-focused': {
            color: '#E61F93',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#E61F93',
          },
        },
      },
    },
  },
});

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage('Error signing in: ' + error.message);
      setOpen(true);
    } else {
      if (signInData.user?.email === 'xiannaoficial@gmail.com') {
        localStorage.setItem('user', JSON.stringify(signInData.user));
        navigate('/dashboard/home');
      } else {
        setErrorMessage('No tienes permisos de administrador.');
        setOpen(true);
      }
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center' }}>
  <CssBaseline />
  <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    {/* Sección de bienvenida rosada */}
    <Grid
      item
      xs={12}  // Cambiado para pantallas extra pequeñas
      sm={12}  // Cambiado para pantallas pequeñas
      md={6}
      sx={{
        backgroundColor: '#E61F93',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: '20px',
        padding: 4,
        marginBottom: { xs: 1, sm: 0, md:0}, // Añade un margen inferior en pantallas pequeñas para separar las columnas
        height: { xs: '30vh', md: '80vh' },
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
          ¡Bienvenida!
        </Typography>
        <Typography component="p" sx={{ marginTop: 2 }}>
          Entra a tu panel de administrador para poder gestionar el contenido de tu sitio.
        </Typography>
      </Box>
    </Grid>

    {/* Sección de inicio de sesión */}
    <Grid
      item
      xs={12}  // Cambiado para pantallas extra pequeñas
      sm={12}  // Cambiado para pantallas pequeñas
      md={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: 4,
      }}
    >
      <Box
        component="img"
        src={logo} // Asegúrate de tener el logo en la ruta correcta
        alt="Xianna Logo"
        sx={{ width: '300px', marginBottom: 3 }}
      />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{
            '& .MuiInputBase-input': { backgroundColor: 'white', borderRadius: '20px' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '20px',
                borderColor: '#E61F93',
              },
              '&:hover fieldset': {
                borderColor: '#E61F93',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#E61F93',
              },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{
            '& .MuiInputBase-input': { backgroundColor: 'white', borderRadius: '20px' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '20px',
                borderColor: '#E61F93',
              },
              '&:hover fieldset': {
                borderColor: '#E61F93',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#E61F93',
              },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#E61F93',
            color: 'white',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
        >
          Iniciar sesión
        </Button>
      </Box>
    </Grid>
  </Container>
</Grid>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
