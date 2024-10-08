import {
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Fade,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { login } from '../services/login';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username) {
      newErrors.username = 'Nombre de usuario es requerido';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Contraseña es requerida';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      login(username, password).then(
        (response) => {
          if (response?.ok === true) {
            setSnackbarMessage('Inicio de sesión exitoso');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/');
          }
          if (response?.ok === false) {
            setSnackbarMessage('Credenciales incorrectas');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        },
        (error) => {
          setSnackbarMessage('Error en inicio sesión' + error);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        },
      );
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Fade in={fadeIn} timeout={1000}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Ingresar
          </Typography>
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            margin="normal"
            type="text"
            placeholder="Usuario"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              onClick={togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </Button>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Ingresar
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            ¿Aún no tienes cuenta?{' '}
            <Button
              component={RouterLink}
              to="/register"
              color="inherit"
              variant="text"
              sx={{ p: 1, textTransform: 'none' }}
            >
              Crear cuenta
            </Button>
          </Typography>
        </Box>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
